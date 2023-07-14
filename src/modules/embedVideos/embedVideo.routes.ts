import { Router } from 'express'

import { authRequired } from '../../core/middlewares/auth-required.js'
import { validateResource } from '../../core/middlewares/validate-resource.js'
import { restrictTo } from '../../core/utils/restrictTo.js'
import {
  createEmbedVideo,
  deleteEmbedVideoByID,
  getAllEmbedVideos,
  getEmbedVideoByID,
  updateEmbedVideoByID,
} from './embedVideo.controller.js'
import {
  CreateEmbedVideoSchema,
  DeleteEmbedVideoSchema,
  getEmbedVideoByIDSchema,
  UpdateEmbedVideoSchema,
} from './embedVideo.schema.js'

const embedVideRouter = Router()

embedVideRouter.use(authRequired)

embedVideRouter.get('/watch', getAllEmbedVideos)
embedVideRouter.get('/watch/:id', validateResource(getEmbedVideoByIDSchema), getEmbedVideoByID)

embedVideRouter.use(restrictTo(['admin']))

embedVideRouter.post('/upload', validateResource(CreateEmbedVideoSchema), createEmbedVideo)

embedVideRouter.put(
  '/update/:id',
  validateResource(UpdateEmbedVideoSchema),
  updateEmbedVideoByID,
)
embedVideRouter.delete(
  '/delete/:id',
  validateResource(DeleteEmbedVideoSchema),
  deleteEmbedVideoByID,
)

export { embedVideRouter }
