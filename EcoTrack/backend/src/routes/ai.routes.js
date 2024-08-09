import express from 'express';
import { getCarbonFootprintPrediction } from '../controllers/ai.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { generateTasks, getTasks, updateTasks } from '../controllers/task.controller.js';

const router = express.Router();

router.post('/predict-carbon-footprint', verifyJWT ,getCarbonFootprintPrediction);
router.post("/generate-task", verifyJWT, generateTasks)
router.put("/update-task",verifyJWT, updateTasks)
router.get("/getTasks", verifyJWT, getTasks)

export default router;
