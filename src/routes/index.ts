import express from 'express'
import userRoutes from './user'

const router = express.Router();

router.get('/', (req, res) => {
    res.json({ status: 'API is running on /api' });
});

router.use('/users', userRoutes)

export default router