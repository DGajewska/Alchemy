import express from 'express'
import cors from 'cors'

import routes from './routes/api.routes'
import userRoutes from './routes/user.routes'
import practitionerRoutes from './routes/practitioner.routes'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/practitioners', practitionerRoutes)

export default app
