import { z } from 'zod'

const serviceAtBusinessSchema = z.object({
  id: z.uuid(),
})

export type ServiceAtBusiness = z.infer<typeof serviceAtBusinessSchema>

export const servicesAtBusinessSchema = z.object({
  services: z.array(serviceAtBusinessSchema).min(1),
})
