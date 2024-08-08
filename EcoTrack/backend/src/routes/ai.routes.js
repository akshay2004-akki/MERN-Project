import express from 'express';
import { getCarbonFootprintPrediction } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { generateTasks, updateTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/predict-carbon-footprint', verifyJWT ,getCarbonFootprintPrediction);
router.post("/generate-task", verifyJWT, generateTasks)
router.put("/update-task",verifyJWT, updateTasks)

export default router;
