import nodemailer from 'nodemailer';
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import asyncHandler from '../utils/asyncHandler.js';

const transporter =  nodemailer.createTransport({
    service:"gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    }
})

const sendEmail = (from,to, subject, text)=>{
    const mailOptions = {
        from,
        to,
        subject,
        text
    }
    transporter.sendMail(mailOptions, (error, info)=>{
        if (error) {
            console.error('Error sending email:', error);
          } else {
            console.error('Email sent:', info.response);
          }
    })
}

export const sendMessage = asyncHandler(async(req,res)=>{
    const {name, email, message} = req.body;

    if(!name || !email || !message){
        throw new ApiError(400,"All fields are required")
    }

    try {
        sendEmail(email, process.env.EMAIL_USER,"Regarding EcoTrack", `You have a new Email from ${name} with email : ${email}\n Message : ${message}`)
    } catch (error) {
        throw new ApiError(500,error?.message)
    }
    return res
            .status(200)
            .json(new ApiResponse(200, {}, "email Send Successfully"))

})