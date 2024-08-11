import express from 'express';
import { generateCarbonFootprintPrediction, getPrediction } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { generateTasks, getTasks, updateTasks } from '../controllers/task.controller.js';

const router = express.Router();
 
router.post('/predict-carbon-footprint', verifyJWT ,generateCarbonFootprintPrediction);
router.get("/getPrediction", verifyJWT, getPrediction)
router.post("/generate-task", verifyJWT, generateTasks)
router.put("/update-task",verifyJWT, updateTasks)
router.get("/getTasks", verifyJWT, getTasks)

export default router;
