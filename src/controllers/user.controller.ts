import bcrypt from 'bcrypt'
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

export const validateCredentials = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        password: true,
      },
    })

    if (!user) return res.status(401).json({ message: 'User not found' })

    const { password, ...userData } = user

    const match = await bcrypt.compare(req.body.password, user.password)
    if (match) return res.status(200).json(userData)

    res.status(401).json({ message: 'Incorrect login credentials provided' })
  } catch (error) {
    console.error('Failed to create new user record:', error)
    res.status(500).json({ message: 'Failed to create new user record' })
  }
}
