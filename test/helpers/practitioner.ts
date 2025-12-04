import { prisma } from '../../src/prisma'
import { PractitionerResponse } from '../../src/types/practitioner.types'

export const testPractitionerData = {
  description: 'Formula 1 Driver',
  socialMedia: {
    instagram: 'ln4',
  },
}

export const createPractitioner = async (
  userId: string
): Promise<PractitionerResponse> => {
  const testPractitioner = await prisma.practitioner.create({
    data: {
      ...testPractitionerData,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  if ('description' in testPractitioner) {
    return testPractitioner
  }

  throw Error('Failed to create test user', testPractitioner)
}
