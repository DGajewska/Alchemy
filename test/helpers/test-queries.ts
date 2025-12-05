import { prisma } from '../../src/prisma'
import {
  generateTestEmail,
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

  throw Error('Failed to create test user', testPractitioner)
}

export const deleteTestUserWithRelations = async ({
  userId,
  practitionerId,
  contactId,
}: Record<string, string>): Promise<void> => {
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

const deleteContacts = prisma.contact.deleteMany({
  where: {
    id: { in: createdContacts },
  },
})

const deleteServices = prisma.service.deleteMany({
  where: {
    practitionerId: { in: createdPractitioners },
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
    deleteServices,
    deleteContacts,
    deletePractitioners,
    deleteUsers,
  ])
