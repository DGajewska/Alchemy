import { PrismaClient } from '../../generated/prisma/client'
import { CreateUserData, UserResponse } from '../interfaces/user'

const prisma = new PrismaClient({
            omit: {
                user: {
                    password: true
                }
            }
        })

export const createUser = async (userData: CreateUserData): Promise<UserResponse | Error> => {
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
