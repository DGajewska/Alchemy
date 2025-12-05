import { prisma } from '../../src/prisma'

const createdUsers: string[] = []

const randomNumber = (max: number): number => Math.floor(Math.random() * max)

export const generateTestEmail = (firstName: string) =>
  `${firstName}${randomNumber(100)}@example.com`

export const testUserData = {
  firstName: 'Lando',
  lastName: 'Norris',
  password: 'Mclaren4life!',
}

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

export const deleteTestUser = async (userId: string): Promise<void> => {
  await prisma.user.delete({
    where: { id: userId },
  })
}

const deleteContacts = prisma.contact.deleteMany({
  where: {
    practitioner: {
      userId: { in: createdUsers },
    }
  },
})

const deleteServices = prisma.service.deleteMany({
  where: {
    practitioner: {
      userId: { in: createdUsers },
    }
  },
})

const deletePractitioners = prisma.practitioner.deleteMany({
  where: {
    userId: { in: createdUsers },
  },
})

const deleteUsers = prisma.user.deleteMany({
  where: {
    id: { in: createdUsers },
  },
})

export const deleteTestUsers = async () =>
  await prisma.$transaction([deleteServices, deleteContacts, deletePractitioners, deleteUsers])
