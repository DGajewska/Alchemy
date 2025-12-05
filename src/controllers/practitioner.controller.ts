import { Request, Response } from 'express'
import { prisma } from '../prisma'

export const createPractitioner = async (req: Request, res: Response) => {
  try {
    const {
      description,
      name,
      contact: contactData,
      services: servicesData,
    } = req.body
    const practitioner = await await prisma.practitioner.create({
      data: {
        name,
        description,
        user: {
          connect: {
            id: req.params.id,
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
    res.status(200).json(practitioner)
  } catch (error) {
    console.error('New practitioner creation failed:', error)
    res
      .status(500)
      .json({ message: 'Failed to create new practitioner record' })
  }
  return
}

export const fetchPractitioner = async (req: Request, res: Response) => {
  const practitioner = await prisma.practitioner.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!practitioner)
    return res.status(404).json({ message: 'Practitioner not found' })
  res.status(200).json(practitioner)
}
