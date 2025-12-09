import express from 'express'
import * as businessController from '../controllers/business.controller'
import {
  validateData,
  validateIdParam,
} from '../middleware/validation.middleware'
import { createBusinessSchema } from '../schemas/business.schema'
import { servicesAtBusinessSchema } from '../schemas/servicesAtBusiness.schema'

const router = express.Router()

router.post(
  '/user/:id',
  validateData(createBusinessSchema),
  validateIdParam(),
  businessController.createBusiness
)

router.post(
  '/:id/add-services',
  validateData(servicesAtBusinessSchema),
  validateIdParam(),
  businessController.addServicesToBusiness
)

router.get('/:id', validateIdParam(), businessController.fetchBusiness)

export default router
