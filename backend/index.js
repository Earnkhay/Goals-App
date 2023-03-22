import express from 'express';
import * as dotenv from 'dotenv'
dotenv.config()
import cors from 'cors'
import path from 'path';
import goalRoutes from './routes/goals.js'
import userRoutes from './routes/users.js'
// import { errorHandler } from './middleware/errorMiddleware.js'
import errorHandler from './middleware/errorMiddleware.js'
import connectDB from './config/db.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const port = process.env.PORT || 3000

connectDB()

const app = express()

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended: false}))
app.use('/api/goals', goalRoutes)
app.use('/api/users', userRoutes)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '../goals-app/dist')))

    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'goals-app', 'dist', 'index.html')))
}else{
    app.get('/', (req,res) => res.send('please set to production'))
}

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))