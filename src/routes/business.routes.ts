import express from 'express'
import * as businessController from '../controllers/business.controller'
import {
  validateData,
  validateIdParam,
} from '../middleware/validation.middleware'
import { createBusinessSchema } from '../schemas/business.schema'

const router = express.Router()

router.post(
  '/user/:id',
  validateData(createBusinessSchema),
  validateIdParam(),
  businessController.createBusiness
)

router.get('/:id', validateIdParam(), businessController.fetchBusiness)

export default router
