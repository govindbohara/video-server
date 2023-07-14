import type { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { StatusCodes } from 'http-status-codes'

import { FORBIDDEN } from '../constants/strings.js'

export const restrictTo = ([...roles]) => {
  return (_req: Request, res: Response, next: NextFunction): void => {
    const user = res.locals.user
    console.log(roles)

    console.log('🚀 ~ file: restrictTo.ts:10 ~ return ~ user:', user.role.toLowerCase())

    if (!roles.includes(user.role.toLowerCase())) {
      return next(createHttpError(StatusCodes.FORBIDDEN, FORBIDDEN))
    }
    next()
  }
}
