import express from 'express';
import { getCarbonFootprintPrediction } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { generateTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/predict-carbon-footprint', verifyJWT ,getCarbonFootprintPrediction);
router.post("/generate-task", verifyJWT, generateTasks)

export default router;
