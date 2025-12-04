import express from 'express'
import * as practitionerController from '../controllers/practitioner.controller'
import { createPractitionerSchema } from '../schemas/practitioner.schema'
import {
  validateData,
  validateIdParam,
} from '../middleware/validation.middleware'

const router = express.Router()

router.post(
  '/user/:id',
  validateData(createPractitionerSchema),
  validateIdParam(),
  practitionerController.createPractitioner
)

router.get('/:id', validateIdParam(), practitionerController.fetchPractitioner)

export default router
