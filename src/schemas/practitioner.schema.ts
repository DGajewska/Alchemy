import { z } from 'zod'

export const createPractitionerSchema = z.object({
  description: z.string().trim().min(5),
  socialMedia: z
    .object({
      instagram: z.string().nullish(),
      facebook: z.string().nullish(),
      x: z.string().nullish(),
    })
    .nullish(),
})
