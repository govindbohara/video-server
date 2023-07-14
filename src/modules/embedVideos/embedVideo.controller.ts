import expressAsyncHandler from 'express-async-handler'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { db } from '../../core/lib/prisma.js'
import { sendSuccessResponse } from '../../core/utils/response.js'
import type {
  CreateEmbedVideoPayload,
  DeleteEmbedVideoParams,
  GetEmbedVideoByIDPayload,
  UpdateEmbedVideoParams,
  UpdateEmbedVideoPayload,
} from './embedVideo.schema.js'

export const createEmbedVideo = expressAsyncHandler(async (req, res, next) => {
  const { description, title, url, startTime, completed, winner } =
    req.body as CreateEmbedVideoPayload

  const embedVideo = await db.embedVideo.findUnique({
    where: {
      url,
    },
  })

  if (embedVideo) {
    return next(createHttpError(StatusCodes.BAD_REQUEST, 'This video is already embedded'))
  }

  const newEmbedVideo = await db.embedVideo.create({
    data: {
      title,
      description,
      url,
      startTime,
      completed,
      winner,
    },
  })

  sendSuccessResponse({
    res,
    message: 'Video embedded successfully.',
    data: { newEmbedVideo },
  })
})

export const getAllEmbedVideos = expressAsyncHandler(async (req, res, _next) => {
  const embedVideos = await db.embedVideo.findMany()

  sendSuccessResponse({
    res,
    message: 'All videos fetched successfully.',
    data: { embedVideos },
  })
})

export const getEmbedVideoByID = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as GetEmbedVideoByIDPayload

  const embedVideo = await db.embedVideo.findUnique({
    where: {
      id: id,
    },
  })

  if (!embedVideo) {
    return next(createHttpError(StatusCodes.NOT_FOUND, 'Video not found'))
  }

  sendSuccessResponse({
    res,
    message: 'Video fetched successfully.',
    data: { embedVideo },
  })
})

export const updateEmbedVideoByID = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as UpdateEmbedVideoParams
  const updatedBody = req.body as UpdateEmbedVideoPayload

  const embedVideo = await db.embedVideo.findUnique({
    where: {
      id: id,
    },
  })

  if (!embedVideo) {
    return next(createHttpError(StatusCodes.NOT_FOUND, 'Video not found'))
  }

  const updatedEmbedVideo = await db.embedVideo.update({
    where: {
      id: id,
    },
    data: updatedBody,
  })

  sendSuccessResponse({
    res,
    message: 'Video updated successfully.',
    data: { updatedEmbedVideo },
  })
})

export const deleteEmbedVideoByID = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params as DeleteEmbedVideoParams

  const embedVideo = await db.embedVideo.findUnique({
    where: {
      id: id,
    },
  })

  if (!embedVideo) {
    return next(createHttpError(StatusCodes.NOT_FOUND, 'Video not found'))
  }

  await db.embedVideo.delete({
    where: {
      id: id,
    },
  })

  sendSuccessResponse({
    res,
    message: 'Video deleted successfully.',
  })
})
