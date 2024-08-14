import { Webinar } from "../models/webinar.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import nodeMailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({
    path : "./.env"
})

const transporter = nodeMailer.createTransport({
    service : "gmail",
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    }
}) 

const sendEmail = (to,subject, text)=>{
    const mailOptions = {
        from : process.env.EMAIL_USER,
        to,
        subject,
        text
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.error('Email sent:', info.response);
        }
      });
}

export const regiterWbinar = asyncHandler(async(req,res)=>{
    const {name, email, date} = req.body;

    if([name, email, date].some((fields)=>fields?.trim()==="")){
        throw new ApiError(400, "all fields are required");
    }
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }

    const existingRegistration = await Webinar.findOne({ email, date: parsedDate });
    if (existingRegistration) {
        res.status(409).send("You have already registered for this date")
        throw new ApiError(400, "You have already registered for this date");
    }
    const newWebinar = await Webinar.create({
        name,
        email,
        date : parsedDate
    })
    
    try {
        sendEmail(email,"Webinar Registration Confirmation", `Hi ${name},\n\nYou have successfully registered for the webinar on ${parsedDate.toLocaleDateString()}.\n Your Time slot is 5pm - 6pm.\n\nBest Regards,\nTeam EcoTrack`)
    } catch (error) {
        console.error(error?.message);
    }
    return res.status(200).json(new ApiResponse(201, newWebinar,"Registered for webinar successfully"))
})