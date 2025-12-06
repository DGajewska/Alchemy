import { prisma } from '../../src/prisma'
import {
  generateTestEmail,
  testBusinessData,
  testPractitionerData,
  testUserData,
} from './test-data'

const createdUsers: string[] = []
const createdPractitioners: string[] = []
const createdContacts: string[] = []

export const createTestUser = async (overrides = {}) => {
  const testUser = await prisma.user.create({
    data: {
      email: generateTestEmail('lando'),
      ...testUserData,
      ...overrides,
    },
  })

  if ('firstName' in testUser) {
    createdUsers.push(testUser.id)
    return testUser
  }

  throw Error('Failed to create test user', testUser)
}

export const createTestPractitioner = async (userId: string) => {
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
    createdPractitioners.push(testPractitioner.id)
    createdContacts.push(testPractitioner.contactId!)
    return testPractitioner
  }

  throw Error('Failed to create test practitioner', testPractitioner)
}

export const createTestBusiness = async (userId: string) => {
  const {
    contact: contactData,
    ...businessData
  } = testBusinessData
  const testBusiness = await prisma.business.create({
    data: {
      ...businessData,
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
    },
  })

  if ('description' in testBusiness) {
    createdContacts.push(testBusiness.contactId!)
    return testBusiness
  }

  throw Error('Failed to create test business', testBusiness)
}

export const deleteTestUserWithRelations = async ({
  userId,
  practitionerId,
  businessId,
  contactId,
}: Record<string, string>): Promise<void> => {
  if (businessId) {
    await prisma.business.delete({
       where: { id: businessId },
    })
  }
  
  if (contactId) {
    await prisma.contact.delete({
      where: { id: contactId },
    })
  }

  if (practitionerId) {
    await prisma.service.deleteMany({
      where: { practitionerId },
    })

    await prisma.practitioner.delete({
      where: { userId },
    })
  }

  await prisma.user.delete({
    where: { id: userId },
  })
}

const deleteBusinesses = prisma.business.deleteMany({
  where: {
    ownerUserId: { in: createdUsers },
  },
})

const deleteServices = prisma.service.deleteMany({
  where: {
    practitionerId: { in: createdPractitioners },
  },
})

const deleteContacts = prisma.contact.deleteMany({
  where: {
    id: { in: createdContacts },
  },
})

const deletePractitioners = prisma.practitioner.deleteMany({
  where: {
    id: { in: createdPractitioners },
  },
})

const deleteUsers = prisma.user.deleteMany({
  where: {
    id: { in: createdUsers },
  },
})

export const deleteTestUsers = async () =>
  await prisma.$transaction([
    deleteBusinesses,
    deleteServices,
    deleteContacts,
    deletePractitioners,
    deleteUsers,
  ])
