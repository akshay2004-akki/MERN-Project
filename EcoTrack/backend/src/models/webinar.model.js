import { Schema, model } from "mongoose";
import validator from "validator";

const webinarSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name required"],
    },
    email : {
        type : String,
        required : [true, "Email is required"],
        validate : [validator.isEmail,"Invalid Email"] 
    },
    date : {
        type : Date,
        required : [true, "Please Enter your prefered data slot"]
    }
},{timestamps:true})
 
export const Webinar = model('Webinar', webinarSchema);