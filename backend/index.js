import express from 'express';
// const dotenv = require('dotenev').config()
import * as dotenv from 'dotenv'
dotenv.config()
import goalRoutes from './routes/goals.js'
import { errorHandler } from './middleware/errorMiddleware.js'
const port = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', goalRoutes)
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))