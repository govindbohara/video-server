import './core/config/index.js'

import type { User } from '@prisma/client'
import { createServer } from 'http'
import { Server } from 'socket.io'

import { app } from './app.js'

interface Message {
  message: string
  user: User
}

const PORT = process.env.PORT
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
  },
})

let streamId: string | undefined
const stream = new Map<string, number>()
const streamMessages = new Map<string, Message[]>()

io.on('connection', socket => {
  console.log('a user connected', socket.id)

  socket.on('send-message', data => {
    if (streamId) {
      const messages = streamMessages.get(streamId) || []
      streamMessages.set(streamId, [...messages, data])
      return io.to(streamId).emit('receive-message', data)
    }
    io.emit('receive-message', data)
  })

  socket.on('join-stream', room => {
    socket.join(room)

    stream.set(room, (stream.get(room) || 0) + 1)
    io.to(room).emit('update-views', stream.get(room), streamMessages.get(room))
    streamId = room
  })

  socket.on('decrease-views', ({ viewCount }) => {
    if (!streamId) return

    stream.set(streamId, viewCount)
    io.to(streamId).emit('update-views', stream.get(streamId), undefined)
  })

  socket.on('disconnecting', () => {
    console.log('user disconnected')
    console.log(socket.rooms)

    if (streamId) {
      stream.set(streamId, (stream.get(streamId) || 1) - 1)
      io.to(streamId).emit('update-views', stream.get(streamId))
    }
  })

  socket.on('disconnect', () => {
    socket.disconnect()
  })
})

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
