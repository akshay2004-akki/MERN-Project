import {GenerativeLanguageClient} from '@google/generative-ai';

const client = new GenerativeLanguageClient({apiKey : process.env.GENERATIVE_AI_API})

export const predictCarbonEmissionsFromSurvey = async (surveyData) => {
    const prompt = `
        Predict the carbon emissions for a user based on the following data:
        - Energy Usage: ${surveyData.energyUsage} kWh/month from ${surveyData.energySource}
        - Transportation: ${surveyData.vehicleType} driven ${surveyData.milesDriven} miles per month
        - Flights: ${surveyData.flightsPerYear} flights per year
        - Diet: ${surveyData.dietType}
        - Cryptocurrency: ${surveyData.cryptoVolume} in transactions per month
        Provide an estimate in kg of CO2 emissions per year .
    `;

    const response = await client.generate({
        model: 'text-davinci-003',
        prompt: prompt,
    });

    return response.text;
};