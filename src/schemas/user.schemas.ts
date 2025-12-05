import { z } from 'zod'

export const createUserSchema = z.object({
  firstName: z.string().trim().min(2),
  lastName: z.string().trim().min(2),
  email: z.email(),
  password: z.string().min(8),
})
