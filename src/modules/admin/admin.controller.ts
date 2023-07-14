import argon2 from 'argon2'
import expressAsyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { db } from '../../core/lib/prisma.js'
import { sendSuccessResponse } from '../../core/utils/response.js'
import type {
  ChangeLiveVideoStatusParams,
  ChangeUserPasswordInputBody,
  ChangeUserPasswordInputParams,
  ChangeUserStatusInput,
  ChangeVideoStatusBody,
  ChangeVideoStatusParams,
  DeleteUserParams,
} from './admin.schema.js'

export const getAllUsers = expressAsyncHandler(async (_req, res, _next) => {
  const users = await db.user.findMany()

  sendSuccessResponse({
    res,
    data: {
      users,
    },
  })
})

export const getAllVideos = expressAsyncHandler(async (_req, res, _next) => {
  const videos = await db.video.findMany()

  sendSuccessResponse({
    res,
    data: {
      videos,
    },
  })
})

export const getAllLiveVideos = expressAsyncHandler(async (_req, res, _next) => {
  const liveVideos = await db.embedVideo.findMany()

  sendSuccessResponse({
    res,
    data: {
      liveVideos,
    },
  })
})

export const changeUserStatus = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as ChangeUserStatusInput

  const user = await db.user.findUnique({ where: { id } })

  if (!user) return next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))

  const userData = await db.user.update({
    where: { id },
    data: { status: user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
  })

  sendSuccessResponse({
    res,
    data: {
      message: `User ${user.username} status changed to ${userData.status}. `,
    },
  })
})

export const changeUserPassword = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as ChangeUserPasswordInputParams
  const { password } = req.body as ChangeUserPasswordInputBody

  const user = await db.user.findUnique({ where: { id } })

  if (!user) return next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))

  const hashedPassword = await argon2.hash(password)

  await db.user.update({
    where: { id },
    data: { password: hashedPassword },
  })

  sendSuccessResponse({
    res,
    data: {
      message: `User ${user.username} password changed. `,
    },
  })
})

export const deleteUser = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as DeleteUserParams

  const user = await db.user.findUnique({
    where: { id },
    include: { verificationTokens: true, sessions: true },
  })

  if (!user) return next(createHttpError(StatusCodes.NOT_FOUND, 'User not found'))

  await db.session.deleteMany({ where: { userId: id } })

  await db.verificationToken.deleteMany({ where: { userId: id } })

  await db.user.delete({ where: { id } })

  sendSuccessResponse({
    res,
    message: `User ${user.username} deleted. `,
  })
})

export const changeVideoStatus = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as ChangeVideoStatusParams
  const { status } = req.body as ChangeVideoStatusBody

  const video = await db.video.findUnique({ where: { id } })

  if (!video) return next(createHttpError(StatusCodes.NOT_FOUND, 'Video not found'))

  await db.video.update({
    where: { id },
    data: { status },
  })

  sendSuccessResponse({
    res,
    message: `Video ${video.title} status changed to ${status}. `,
  })
})

export const changeLiveVideoStatus = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as ChangeLiveVideoStatusParams

  const liveVideo = await db.embedVideo.findUnique({ where: { id } })

  if (!liveVideo) return next(createHttpError(StatusCodes.NOT_FOUND, 'Live video not found'))

  const updatedLiveVideo = await db.embedVideo.update({
    where: { id },
    data: { status: liveVideo.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE' },
  })

  sendSuccessResponse({
    res,
    message: `Live video ${liveVideo.title} status changed to ${updatedLiveVideo.status}. `,
  })
})
