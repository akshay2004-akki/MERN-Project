import { Router } from "express";
import { sendMessage } from "../controllers/contactus.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", verifyJWT, sendMessage)

export default router