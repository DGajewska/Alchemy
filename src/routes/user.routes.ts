import express from 'express'
import * as userController from '../controllers/user.controller'
import {
  validateData,
  validateIdParam,
} from '../middleware/validation.middleware'
import { createUserSchema } from '../schemas/user.schemas'

const router = express.Router()

router.post('/', validateData(createUserSchema), userController.createUser)

router.get('/:id', validateIdParam(), userController.fetchUser)

export default router
