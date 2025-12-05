import { prisma } from '../../src/prisma'

export const testPractitionerData = {
  name: 'Quadrant',
  description: 'Formula 1 Driver',
  contact: {
    phoneNumber: '2268579038',
    website: null,
    email: null,
    socialMedia: {
      instagram: 'http://instagram.com/ln4',
    },
  }
}

export const createPractitioner = async (
  userId: string
) => {
  const { contact, ...practitionerData } = testPractitionerData
  const testPractitioner = await prisma.practitioner.create({
    data: {
      ...practitionerData,
      user: {
        connect: {
          id: userId,
        },
      },
      contact: {
        create: {
          ...contact
        }
      }
    },
  })

  if ('description' in testPractitioner) {
    return testPractitioner
  }

  throw Error('Failed to create test user', testPractitioner)
}
