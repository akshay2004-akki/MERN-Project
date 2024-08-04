import mongoose from "mongoose";

const surveyResponseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  energyUsage: { type: Number, required: true },
  energySource: { type: String, required: true },
  vehicleType: { type: String, required: true },
  milesDriven: { type: Number, required: true },
  flightsPerYear: { type: Number, required: true },
  dietType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const SurveyResponse = mongoose.model("SurveyResponse", surveyResponseSchema);

export default SurveyResponse;
