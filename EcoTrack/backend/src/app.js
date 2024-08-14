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
import blogRoutes from './routes/blog.routes.js'
import commentRoutes from './routes/comment.routes.js'
import likeRoutes from './routes/like.routes.js'
import webinarRoutes from './routes/webinar.routes.js'

app.use("/api/v4/users", userRouter)
app.use('/api/v4/ai', aiRoutes);
app.use("/api/v4/blogs", blogRoutes)
app.use("/api/v4/comments", commentRoutes)
app.use("/api/v4/likes", likeRoutes)
app.use("/api/v4/webinar", webinarRoutes)

export default app