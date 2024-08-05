import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { ApiError } from '../utils/ApiError.js';
dotenv.config();

const client = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API);

export const predictCarbonEmissionsFromSurvey = async (surveyData) => {
    try {
        const model = client.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        // Extract necessary data points, with default values if not provided
        const energyUsage = surveyData.energyUsage || 'unknown'; // kWh/month
        const energySource = surveyData.energySource || 'mixed'; // Source mix e.g., solar, wind, coal
        const vehicleType = surveyData.vehicleType || 'unknown'; // e.g., Gasoline car, Electric car
        const milesDriven = surveyData.milesDriven || 0; // miles per month
        const publicTransportTrips = surveyData.publicTransportTrips || 0; // trips per month
        const flightsPerYear = surveyData.flightsPerYear || 0; // Number of flights per year
        const flightDistance = surveyData.flightDistance || 'unknown'; // e.g., short-haul, long-haul
        const dietType = surveyData.dietType || 'mixed'; // e.g., vegetarian, non-vegetarian
        const wasteGenerated = surveyData.wasteGenerated || 'unknown'; // Amount of waste per week/month
        const recyclingRate = surveyData.recyclingRate || 'unknown'; // Percentage of waste recycled
        const heatingType = surveyData.heatingType || 'unknown'; // Type of heating system
        const coolingUsage = surveyData.coolingUsage || 'unknown'; // Energy usage for cooling per month

        // Generate the AI prompt using the above data points
        const prompt = `
            Predict the carbon emissions for a user based on the following data:
            - Energy Usage: ${energyUsage} kWh/month from ${energySource}
            - Transportation: ${vehicleType} driven ${milesDriven} miles per month, ${publicTransportTrips} public transport trips per month
            - Flights: ${flightsPerYear} flights per year (${flightDistance} flights)
            - Diet: ${dietType}
            - Waste: ${wasteGenerated} waste generated with ${recyclingRate} recycling rate
            - Heating: ${heatingType} heating system
            - Cooling: ${coolingUsage} energy usage per month
            Provide an estimate value of total CO2 emissions per year and higlight the estimated value.
        `;

        const result = await model.generateContent(prompt); 
        const response = await result.response;
        const processedResponse = response.text().replace(/\*\*(.*?)\*\*/g, '<strong class="highlight">$1</strong>');
        console.log(processedResponse);
        
        return processedResponse;
    } catch (error) {
        throw new ApiError(400, error.message);
    }
};
