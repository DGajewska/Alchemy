import express from 'express'
import * as usersController from '../controllers/users'

const api = express.Router()

api.post('/', async (req, res) => {
    try {
        const user = await usersController.createUser(req.body)
        console.log(req.body)
        res.send(user).status(200)
    } catch (error) {
        console.error('New user creation failed:', error)
        res.send('Failed to create new user record').status(500)
    }
})

api.get('/:id', async (req, res) => {
    const user = await usersController.fetchUser(req.params.id)

    if (!user) res.send('User not found').status(404)
    res.send(user).status(200)
})

export default api