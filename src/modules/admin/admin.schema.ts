import { z } from 'zod'

export const changeUserStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const changeUserPasswordSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    password: z.string().min(6).max(100),
  }),
})

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const changeVideoStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  }),
})

export const changeLiveVideoStatusSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export type ChangeUserStatusInput = z.infer<typeof changeUserStatusSchema>['params']
export type ChangeUserPasswordInputParams = z.infer<typeof changeUserPasswordSchema>['params']
export type ChangeUserPasswordInputBody = z.infer<typeof changeUserPasswordSchema>['body']
export type DeleteUserParams = z.infer<typeof deleteUserSchema>['params']
export type ChangeVideoStatusParams = z.infer<typeof changeVideoStatusSchema>['params']
export type ChangeVideoStatusBody = z.infer<typeof changeVideoStatusSchema>['body']
export type ChangeLiveVideoStatusParams = z.infer<typeof changeLiveVideoStatusSchema>['params']
