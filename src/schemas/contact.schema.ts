import { z } from 'zod'

const socialMediaSchema = z
  .object({
    facebook: z.url().trim().nullish(),
    instagram: z.url().trim().nullish(),
    substack: z.url().trim().nullish(),
    tiktok: z.url().trim().nullish(),
    x: z.url().trim().nullish(),
    youtube: z.url().trim().nullish(),
  })
  .transform((obj) => {
    return Object.fromEntries(
      Object.entries(obj).filter(([, value]) => typeof value === 'string')
    )
  })

export const contactSchema = z
  .object({
    phoneNumber: z
      .string()
      .trim()
      .regex(/^[0-9-+\s]{6,20}/)
      .nullable(),
    email: z.email().trim().nullable(),
    website: z.url().trim().nullable(),
    socialMedia: socialMediaSchema.nullable(),
  })
  .superRefine(({ phoneNumber, email, website, socialMedia }, ctx) => {
    // Check if there is at least one contact field submitted
    if (
      !(
        phoneNumber ||
        email ||
        website ||
        Object.keys(socialMedia || {}).length
      )
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'At least one contact method must be provided',
        input: null,
      })
    }
  })
