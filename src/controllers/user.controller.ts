import { Prisma } from '../../generated/prisma/client'
import { prisma } from '../prisma'
import { UserResponse } from '../types/user.types'

export const createUser = async (userData: Prisma.UserCreateInput): Promise<UserResponse | Error> => {
    return await prisma.user.create({
        data: {
            firstName: userData.firstName,
            lastName: userData.lastName,
            aka: userData.aka,
            email: userData.email,
            password: userData.password,
        },
    })
}

export const fetchUser = async (id: string): Promise<UserResponse | null> => {
    return await prisma.user.findUnique({
        where: {
            id,
        },
    })
}

