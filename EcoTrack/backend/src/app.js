import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'

dotenv.config({
    path:"./.env"
})

const app = express()

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(express.json({limit:"20kb"}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

import userRouter from './routes/user.routes.js'
import aiRoutes from './routes/ai.routes.js'

app.use("/api/v4/users", userRouter)
app.use('/api/v4/ai', aiRoutes);

export default app