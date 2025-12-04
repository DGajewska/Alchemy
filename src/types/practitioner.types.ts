import { JsonValue } from '@prisma/client/runtime/library'

type SocialMediaJson = {
  string: string
}

export type CreatePractitionerData = {
  description: string
  userId: string
  socialMedia?: SocialMediaJson | undefined
}

export type PractitionerResponse = {
  id: string
  description: string
  userId: string
  contactId: string | null
  socialMedia: JsonValue | null
  createdAt: Date
  updatedAt: Date
}
