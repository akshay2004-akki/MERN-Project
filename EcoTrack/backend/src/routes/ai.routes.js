import express from 'express';
import { getCarbonFootprintPrediction } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/predict-carbon-footprint', verifyJWT ,getCarbonFootprintPrediction);

export default router;
