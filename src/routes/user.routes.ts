import express from 'express'
import * as userController from '../controllers/user.controller'
import {
  validateData,
  validateIdParam,
} from '../middleware/validation.middleware'
import { createUserSchema, loginUserSchema } from '../schemas/user.schemas'
import { encryptPassword } from '../middleware/encryption.middleware'

const router = express.Router()

router.post(
  '/',
  validateData(createUserSchema),
  encryptPassword(),
  userController.createUser
)

router.post(
  '/validate-credentials',
  validateData(loginUserSchema),
  userController.validateCredentials
)

router.get('/:id', validateIdParam(), userController.fetchUser)

export default router
