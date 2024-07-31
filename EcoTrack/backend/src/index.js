import connectDB from "./db/index.js";
import dotenv from 'dotenv'
import app from './app.js'

dotenv.config({
    path : "./.env" 
})

connectDB()
.then(()=>{
    app.on("error", (err)=>{
        console.error("error occured database connection failed", err);
    })
    app.listen(process.env.PORT, ()=>{
        console.log(`listining on port : ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.error("connection to database failed ", err) 
})