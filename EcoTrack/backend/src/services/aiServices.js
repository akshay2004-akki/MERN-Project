import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError.js';
dotenv.config();

const client = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API);

export const predictCarbonEmissionsFromSurvey = async (surveyData) => {
    try {
        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Helper function to join array values into readable descriptions
        const joinDescription = (field) => {
            return Array.isArray(field) && field.length > 0 ? field.join(', ') : 'No description provided';
        };

        // Extract descriptive data points by joining array values into readable strings
        const energyUsageDescription = joinDescription(surveyData.energyUsageDescription);
        const energySourceDescription = joinDescription(surveyData.energySourceDescription);
        const vehicleTypeDescription = joinDescription(surveyData.vehicleTypeDescription);
        const transportationHabits = joinDescription(surveyData.transportationHabits);
        const flightHabits = joinDescription(surveyData.flightHabits);
        const dietDescription = joinDescription(surveyData.dietDescription);
        const wasteManagementDescription = joinDescription(surveyData.wasteManagementDescription);
        const heatingUsageDescription = joinDescription(surveyData.heatingUsageDescription);
        const coolingUsageDescription = joinDescription(surveyData.coolingUsageDescription);
        const latitude = surveyData.latitude;
        const longitude = surveyData.longitude;

        // You can integrate the location logic here to use latitude and longitude
        // with a suitable service, such as an external API for location lookup

        // Generate the AI prompt using descriptive data points
        const prompt = `
            Predict the carbon emissions for a user based on the following lifestyle descriptions:
            - Energy Usage: ${energyUsageDescription}
            - Energy Source: ${energySourceDescription}
            - Transportation: ${vehicleTypeDescription}
            - Transportation Habits: ${transportationHabits}
            - Flights: ${flightHabits}
            - Diet: ${dietDescription} 
            - Waste Management: ${wasteManagementDescription}
            - Heating Usage: ${heatingUsageDescription}
            - Cooling Usage: ${coolingUsageDescription}

            Please provide an estimated value of total CO2/year and highlight the estimated value. 
            Provide detailed calculations for the estimated values (use unit CO2/year), and the user is currently living in India. Always use this unit: kg CO2/year. Do not include units like kg CO2/year/kWh, etc. Use only kg CO2/year. And don't include these types of sentences like "It's impossible to provide a precise carbon emission estimate without specific data."
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;

        // Highlight estimated values and replace newlines for readability
        const processedResponse = response.text().replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>').replace(/\n/g, '<br/>');
        
        console.log(processedResponse);
        return processedResponse;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
