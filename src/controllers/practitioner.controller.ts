import { prisma } from '../prisma'
import { CreatePractitionerData, PractitionerResponse } from '../types/practitioner.types'


export const createPractitioner = async (practitionerData: CreatePractitionerData): Promise<PractitionerResponse | Error> => {
    return await prisma.practitioner.create({
        data: {
            description: practitionerData.description,
            socialMedia: practitionerData.socialMedia,
            user: {
                connect: { 
                    id: practitionerData.userId 
                }
            },  
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

