import express from 'express'
import { PrismaClient } from '../../generated/prisma/client'

const prisma = new PrismaClient()
const api = express.Router()

api.get('user/:id', async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.params.id,
        },
    })
    if (!user) res.send('User not found').status(404)
    res.send(user).status(200)
})

export default api