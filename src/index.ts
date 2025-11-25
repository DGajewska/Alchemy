import express from 'express'
import cors from 'cors'

import routes from './routes'
import userRoutes from './routes/users'

const PORT = process.env.PORT || 5050

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api/v1', routes)
app.use('/api/v1/users', userRoutes)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

export default app