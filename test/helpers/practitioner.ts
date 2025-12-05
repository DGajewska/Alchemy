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
  },
  services: [
    {
      name: 'Hot laps',
      description:
        "Get in the driver's seat and experience the thrill of a race lap around the track",
      online: false,
      inPerson: true,
    },
  ],
}

export const createPractitioner = async (userId: string) => {
  const {
    contact: contactData,
    services: servicesData,
    ...practitionerData
  } = testPractitionerData
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
          ...contactData,
        },
      },
      services: {
        create: servicesData,
      },
    },
  })

  if ('description' in testPractitioner) {
    return testPractitioner
  }

  throw Error('Failed to create test user', testPractitioner)
}
