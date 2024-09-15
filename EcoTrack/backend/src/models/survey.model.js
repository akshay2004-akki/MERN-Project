import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  energyUsageDescription: { type: Array, required: true }, // e.g., "I mostly use electricity generated from solar panels..."
  energySourceDescription: { type: Array, required: true }, // e.g., "Primarily solar energy, with some grid energy backup."
  
  vehicleTypeDescription: { type: Array, required: true }, // e.g., "I use a bicycle for daily commuting and occasionally drive..."
  transportationHabits: { type: Array, required: true }, // e.g., "I cycle to work and use public transportation for longer journeys."
  
  flightHabits: { type: Array, required: true }, // e.g., "I fly twice a year for vacations, mostly short domestic flights."
  dietDescription: { type: Array, required: true }, // e.g., "I eat a balanced diet with a mix of vegetables and meat..."
  
  wasteManagementDescription: { type: Array, required: true }, // e.g., "I recycle regularly and compost food scraps..."
  heatingUsageDescription: { type: Array, required: true }, // e.g., "I use an electric heater in the winter..."
  coolingUsageDescription: { type: Array, required: true }, 
}, {timestamps:true});

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);

export default SurveyResponse;
