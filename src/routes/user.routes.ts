import express from 'express'
import * as userController from '../controllers/user.controller'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const user = await userController.createUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.error('New user creation failed:', error)
        res.status(500).json({ message: 'Failed to create new user record' })
    }
})

router.get('/:id', async (req, res) => {
    const user = await userController.fetchUser(req.params.id)

    if (!user) return res.status(404).json({ message: 'User not found' })
    res.status(200).json(user)
})

export default router