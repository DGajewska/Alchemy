import express from 'express'
import * as practitionerController from '../controllers/practitioner.controller'

const router = express.Router()

router.post('/', async (req, res) => {
  try {
    const practitioner = await practitionerController.createPractitioner(
      req.body
    )
    res.status(200).json(practitioner)
  } catch (error) {
    console.error('New practitioner creation failed:', error)
    res
      .status(500)
      .json({ message: 'Failed to create new practitioner record' })
  }
})

router.get('/:id', async (req, res) => {
  const practitioner = await practitionerController.fetchPractitioner(
    req.params.id
  )

  if (!practitioner)
    return res.status(404).json({ message: 'Practitioner not found' })
  res.status(200).json(practitioner)
})

export default router
