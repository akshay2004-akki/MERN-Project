import mongoose from 'mongoose';

const aiPredictionSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    surveyResponseId: { type: mongoose.Schema.Types.ObjectId, ref: 'SurveyResponse', required: true },
    prediction: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const AiPrediction = mongoose.model('AiPrediction', aiPredictionSchema);

export default AiPrediction;
