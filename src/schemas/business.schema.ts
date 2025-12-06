import { z } from 'zod'
import { contactSchema } from './contact.schema'

export const createBusinessSchema = z.object({
  name: z.string().trim().nullable(),
  description: z.string().trim().min(5),
  addressLine1: z.string().trim(),
  addressLine2: z.string().trim().nullable(),
  city: z.string().trim(),
  region: z.string().trim(),
  postalCode: z.string().trim(),
  country: z.string().trim(),
  contact: contactSchema,
})
