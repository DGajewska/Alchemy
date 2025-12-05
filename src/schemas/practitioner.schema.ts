import { z } from 'zod'
import { contactSchema } from './contact.schema'

export const createPractitionerSchema = z.object({
  name: z.string().trim().nullable(),
  description: z.string().trim().min(5),
  contact: contactSchema
})
