import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv'
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const genAi = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API)

export const generateTasks = asyncHandler(async(req,res)=>{
    try {
        const model = genAi.getGenerativeModel({model : "gemini-1.5-flash"})
    
        const prompt = "Generate a new set of 20 easy task for an idividual that can help to reduce carbon emmission"
    
        const result = await model.generateContent(prompt); 
        const response = result.response;
    
        // console.log((response.text()));
        const cleanedText = response.text().replace(/##.*/g, "");

        const tasksArray = cleanedText
        .split(/\d+\.\s+/)   // Split by number followed by period and space
        .filter(task => task.trim() !== "" && task.trim() !== "\n") // Filter out any empty strings
        .map(task => task.replace(/\*\*/g, "").trim());

        console.log(tasksArray);
        

        return res.status(200).json(new ApiResponse(200, tasksArray, "Tasks generated successfully"));
    
    } catch (error) {
        res.status(500).json(error?.message);
    }
})