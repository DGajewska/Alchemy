import { z } from 'zod'
import { contactSchema } from './contact.schema'
import { serviceSchema } from './service.schema'

export const createPractitionerSchema = z.object({
  name: z.string().trim().nullable(),
  description: z.string().trim().min(5),
  contact: contactSchema,
  services: serviceSchema.array().min(1),
})
