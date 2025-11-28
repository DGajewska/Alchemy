import { prisma } from '../../src/prisma'
import { CreateUserData, UserResponse } from '../../src/types/user.types'

const createdUsers: string[] = []

const testUserData = {
    firstName: 'Lando',
    lastName: 'Norris',
    aka: 'LN4',
    password: 'Mclaren4life!'
}

const randomNumber = (max: number): number => Math.floor(Math.random() * max);

export const generateTestEmail = (firstName: string) => `${firstName}${randomNumber(100)}@example.com`;

export const createTestUser = async (overrides?: CreateUserData): Promise<UserResponse> => {
    const userData = { 
        ...testUserData, 
        email: generateTestEmail('lando'),
        ...overrides
    }

    const testUser = await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            aka: userData.aka,
            email: userData.email,
            password: userData.password,
        },
    })
    if ('firstName' in testUser) {
        return testUser;
    }

    throw Error('Failed to create test user', testUser)
}

export const deleteTestUser = async (userId: string): Promise<void> => {
    await prisma.user.delete({
        where: { id: userId, },
    })
}

export const deleteTestUsers = async (): Promise<void> => {
    await prisma.user.deleteMany({
        where: { id: { in: createdUsers }, },
    })
}