import { Prisma } from '../../generated/prisma/client'
import { prisma } from '../prisma'
import { PractitionerResponse } from '../types/practitioner.types'


export const createPractitioner = async (practitionerData: Prisma.PractitionerCreateInput): Promise<PractitionerResponse | Error> => {
    return await prisma.practitioner.create({
        data: {
            description: practitionerData.description,
            user: practitionerData.user,
            socialMedia: practitionerData.socialMedia,
        },
    })
}

export const fetchPractitioner = async (id: string): Promise<PractitionerResponse | null> => {
    return await prisma.practitioner.findUnique({
        where: {
            id,
        },
    })
}

