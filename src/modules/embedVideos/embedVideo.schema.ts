import { z } from 'zod'

export const CreateEmbedVideoSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    url: z.string().url(),
    startTime: z.string().min(1).max(100),
    completed: z.boolean().optional(),
    winner: z.string(),
  }),
})

export const getEmbedVideoByIDSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export const UpdateEmbedVideoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
  body: z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(500),
    url: z.string().url(),
    startTime: z.string(),
    completed: z.boolean(),
    winner: z.string(),
  }),
})

export const DeleteEmbedVideoSchema = z.object({
  params: z.object({
    id: z.string().uuid(),
  }),
})

export type CreateEmbedVideoPayload = z.infer<typeof CreateEmbedVideoSchema>['body']
export type GetEmbedVideoByIDPayload = z.infer<typeof getEmbedVideoByIDSchema>['params']
export type UpdateEmbedVideoPayload = z.infer<typeof UpdateEmbedVideoSchema>['body']
export type UpdateEmbedVideoParams = z.infer<typeof UpdateEmbedVideoSchema>['params']
export type DeleteEmbedVideoParams = z.infer<typeof DeleteEmbedVideoSchema>['params']
