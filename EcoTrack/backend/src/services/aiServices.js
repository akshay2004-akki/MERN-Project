import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError.js';
dotenv.config();

const client = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API);

export const predictCarbonEmissionsFromSurvey = async (surveyData) => {
    try {
        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Extract descriptive data points
        const energyUsageDescription = surveyData.energyUsageDescription || 'No description provided';
        const energySourceDescription = surveyData.energySourceDescription || 'No description provided';
        const vehicleTypeDescription = surveyData.vehicleTypeDescription || 'No description provided';
        const transportationHabits = surveyData.transportationHabits || 'No description provided';
        const flightHabits = surveyData.flightHabits || 'No description provided';
        const dietDescription = surveyData.dietDescription || 'No description provided';
        const wasteManagementDescription = surveyData.wasteManagementDescription || 'No description provided';
        const heatingUsageDescription = surveyData.heatingUsageDescription || 'No description provided';
        const coolingUsageDescription = surveyData.coolingUsageDescription || 'No description provided';
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
            Provide detailed calculations for the estimated values (use unit CO2/year), and the user is currentlu living in India. And don't include these types of sentences "It's impossible to provide a precise carbon emission estimate without specific data"
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const processedResponse = response.text().replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>').replace(/\n/g, '<br/>');;
        console.log(processedResponse);

        return processedResponse;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
