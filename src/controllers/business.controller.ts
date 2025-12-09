import { Request, Response } from 'express'
import { prisma } from '../prisma'
import { ServiceAtBusiness } from '../schemas/servicesAtBusiness.schema'

export const createBusiness = async (req: Request, res: Response) => {
  try {
    const {
      contact: contactData,
      services: servicesData,
      ...businessData
    } = req.body
    const business = await await prisma.business.create({
      data: {
        ...businessData,
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
      },
    })

    res.status(200).json(business)
  } catch (error) {
    console.error('New business creation failed:', error)
    res.status(500).json({ message: 'Failed to create new business record' })
  }
  return
}

export const addServicesToBusiness = async (req: Request, res: Response) => {
  const data = req.body.services.map((service: ServiceAtBusiness) => ({
    businessId: req.params.id,
    serviceId: service.id,
  }))

  const servicesAtBusiness = await prisma.servicesAtBusiness.createMany({
    data,
  })

  if (!servicesAtBusiness)
    return res
      .status(500)
      .json({ message: 'Unable to add service to business' })
  res.status(200).json(servicesAtBusiness)
}

export const fetchBusiness = async (req: Request, res: Response) => {
  const business = await prisma.business.findUnique({
    where: {
      id: req.params.id,
    },
  })

  if (!business) return res.status(404).json({ message: 'Business not found' })
  res.status(200).json(business)
}
