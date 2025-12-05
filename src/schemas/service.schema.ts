import { z } from 'zod'

export const serviceSchema = z.object({
  name: z.string().trim().min(5),
  description: z.string().trim().min(5),
  online: z.boolean(),
  inPerson: z.boolean(),
})
