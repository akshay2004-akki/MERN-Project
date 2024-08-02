import { Router } from "express";
import { getUserDetails, loginUser, logOutUser, refreshAccessToken, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.post("/register", upload.fields([
    {
        name : "avatar",
        maxCount : 1
    }
]), registerUser)
router.post("/login", loginUser )
router.post("/logout", verifyJWT, logOutUser);
router.get("/user-details", verifyJWT, getUserDetails)
router.post("/refresh-token", refreshAccessToken)

export default router