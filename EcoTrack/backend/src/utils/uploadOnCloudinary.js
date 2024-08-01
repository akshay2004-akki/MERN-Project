import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import dotenv from "dotenv";
import { ApiError } from "./ApiError.js";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) =>{
    if(!localFilePath){
        
        return null;
    }

    try {
        
        const response = await cloudinary.uploader.upload(localFilePath, {
          resource_type: "auto"
        });
    
        
    
        // Remove the file after successful upload
        await fs.unlink(localFilePath);
    
        return response;
      } catch (error) {
        console.error("Error occurred in try block:", error);
    
        try {
          await fs.unlink(localFilePath);
        } catch (unlinkError) {
          console.error("Error removing temporary file:", unlinkError);
        }
    
        return null;
      }
}

export {uploadOnCloudinary}