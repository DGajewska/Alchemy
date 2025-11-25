import express from 'express'
import * as usersController from '../controllers/users'

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const user = await usersController.createUser(req.body)
        res.status(200).json(user)
    } catch (error) {
        console.error('New user creation failed:', error)
        res.send('Failed to create new user record').status(500)
    }
})

router.get('/:id', async (req, res) => {
    const user = await usersController.fetchUser(req.params.id)

    if (!user) return res.json('User not found').status(404)
    res.status(200).json(user)
})

export default router