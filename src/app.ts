import cookieParser from 'cookie-parser'
import cors from 'cors'
import type { NextFunction, Request, Response } from 'express'
import Express from 'express'
import type { HttpError } from 'http-errors'
import { StatusCodes } from 'http-status-codes'
import morgan from 'morgan'

import { sendErrorResponse } from './core/utils/response.js'
import { adminRouter } from './modules/admin/admin.routes.js'
import { authRouter } from './modules/auth/auth.routes.js'
import { channelRouter } from './modules/channel/channel.routes.js'
import { commentRouter } from './modules/comment/comment.routes.js'
import { embedVideRouter } from './modules/embedVideos/embedVideo.routes.js'
import { videoRouter } from './modules/video/video.routes.js'

const app = Express()

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }))

app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(Express.static('public'))
// third-party middlewares
app.use(cookieParser())
app.use(morgan('dev'))
// app routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/channel', channelRouter)
app.use('/api/v1/video', videoRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/api/v1/live', embedVideRouter)
app.use('/api/v1/admin', adminRouter)

// 404 error handler
app.use('*', (req, res) => {
  const message = `The route ${req.originalUrl} doesn't exist on this server`
  sendErrorResponse({
    statusCodes: StatusCodes.NOT_FOUND,
    res,
    message,
  })
})

// global error handler
app.use((error: HttpError, _req: Request, res: Response, _next: NextFunction) => {
  sendErrorResponse({
    res,
    message: error.message,
    statusCodes: error.status ?? StatusCodes.INTERNAL_SERVER_ERROR,
  })
})

export { app }
