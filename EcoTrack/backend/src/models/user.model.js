import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
    },

   email : {
     type : String,
     required : true
   },

   password : {
    type : String,
    required : true,
    minLenght : 8,
   },
    
   role : {
    type : String,
    enum : ["Individual" , "Organisation"],
    required : true
   },
   avatar : {
    type : String,
    required : true
   }
   
},{timestamps:true})