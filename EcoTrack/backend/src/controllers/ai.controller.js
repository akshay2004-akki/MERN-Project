// backend/controllers/aiController.js
import SurveyResponse from '../models/survey.model.js';
import AiPrediction from '../models/ai.model.js';
import { predictCarbonEmissionsFromSurvey } from '../services/aiServices.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

export const generateCarbonFootprintPrediction = async (req, res) => {
    try {
        const surveyData = req.body;

        const surveyResponse = await SurveyResponse.create({
            userId: req.user.id,
            ...surveyData
        });

        const prediction = await predictCarbonEmissionsFromSurvey(surveyData);
        console.log(prediction);
        
        const existPrediction = await AiPrediction.findOne({userId : req.user.id})
        if(existPrediction){
            existPrediction.prediction = prediction;
            await existPrediction.save()

            res.status(200).json(new ApiResponse(200, {}, "Prediction updated successfully"));
        }

        else {
            // If no prediction exists, create a new one
            await AiPrediction.create({
                userId: req.user.id,
                surveyResponseId: surveyResponse._id,
                prediction
            });

            res.status(200).json(new ApiResponse(200, {}, "Prediction generated successfully"));
        }
    } catch (error) {
        res.status(500).json(error?.message);
    }
};

export const getPrediction = asyncHandler(async(req,res)=>{
    const userId = req.user?._id;

    const userPrediction = await AiPrediction.findOne({userId : userId});

    if(!userPrediction){
        throw new ApiError(400,"Invalid User")
    }

    res.status(200).json(new ApiResponse(200,userPrediction.prediction, "Prediction fetched successfully"))
})
