// backend/controllers/aiController.js
import SurveyResponse from '../models/survey.model.js';
import AiPrediction from '../models/ai.model.js';
import { predictCarbonEmissionsFromSurvey } from '../services/aiServices.js';
import { ApiResponse } from '../utils/ApiResponse.js';

export const getCarbonFootprintPrediction = async (req, res) => {
    try {
        const surveyData = req.body;

        // Save survey response
        const surveyResponse = await SurveyResponse.create({
            userId: req.user.id,
            ...surveyData
        });

        // Generate prediction
        const prediction = await predictCarbonEmissionsFromSurvey(surveyData);
        console.log(prediction);
        

        // Save prediction
        await AiPrediction.create({
            userId: req.user.id,
            surveyResponseId: surveyResponse._id,
            prediction
        });

        res.status(200).json(new ApiResponse(200,prediction, "Prediction generated succesfully"));
    } catch (error) {
        res.status(500).json(error?.message);
    }
};
