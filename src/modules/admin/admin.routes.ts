import { Router } from 'express'

import { authRequired } from '../../core/middlewares/auth-required.js'
import { validateResource } from '../../core/middlewares/validate-resource.js'
import { restrictTo } from '../../core/utils/restrictTo.js'
import {
  changeLiveVideoStatus,
  changeUserPassword,
  changeUserStatus,
  changeVideoStatus,
  deleteUser,
  getAllLiveVideos,
  getAllUsers,
  getAllVideos,
} from './admin.controller.js'
import {
  changeLiveVideoStatusSchema,
  changeUserPasswordSchema,
  changeUserStatusSchema,
  changeVideoStatusSchema,
  deleteUserSchema,
} from './admin.schema.js'

const adminRouter = Router()

adminRouter.use(authRequired)

adminRouter.use(restrictTo(['admin']))

adminRouter.get('/get-all-users', getAllUsers)

adminRouter.get('/get-all-videos', getAllVideos)

adminRouter.get('/get-all-live-videos', getAllLiveVideos)

adminRouter.put('/user/status/:id', validateResource(changeUserStatusSchema), changeUserStatus)

adminRouter.put(
  '/user/change-password/:id',
  validateResource(changeUserPasswordSchema),
  changeUserPassword,
)

adminRouter.delete('/delete/user/:id', validateResource(deleteUserSchema), deleteUser)

adminRouter.put(
  '/video/status/:id',
  validateResource(changeVideoStatusSchema),
  changeVideoStatus,
)

adminRouter.put(
  '/live-video/status/:id',
  validateResource(changeLiveVideoStatusSchema),
  changeLiveVideoStatus,
)

export { adminRouter }
