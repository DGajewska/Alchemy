import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.json({ status: 'API is running on /api' })
})

export default router
