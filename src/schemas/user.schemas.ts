import { z } from 'zod'

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  aka: z.string().trim().nullish(),
  email: z.email(),
  password: z.string().min(8),
})
