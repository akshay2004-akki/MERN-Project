import mongoose, { Schema, model } from "mongoose";

const taskSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    tasksCompleted : {
        
    }
},{timestamps:true})