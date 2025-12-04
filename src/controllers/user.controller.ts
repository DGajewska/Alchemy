import { Request, Response } from 'express'

import { prisma } from '../prisma'

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    })
    res.status(200).json(user)
  } catch (error) {
    console.error('Failed to create new user record:', error)
    res.status(500).json({ message: 'Failed to create new user record' })
  }
}

export const fetchUser = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.params.id,
    },
    include: {
      practitioner: true,
    },
  })

  if (!user) return res.status(404).json({ message: 'User not found' })

  res.status(200).json(user)
}
