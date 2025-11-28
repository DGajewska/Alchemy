import express from 'express'
import cors from 'cors'

import routes from './routes/api.routes'
import userRoutes from './routes/user.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)
app.use('/api/v1/users', userRoutes)

export default app