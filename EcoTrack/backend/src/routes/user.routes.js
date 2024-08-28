import { Router } from "express";
import { changePassword, getUserDetails, loginUser, logOutUser, refreshAccessToken, registerUser, updateAccountDetails, updateUserAvatar,  } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'

const router = Router();

router.post("/register", upload.fields([
    {
        name : "avatar",
        maxCount : 1
    }
]), registerUser)
// router.post("/sendCode", sendCode)
// router.post("/verifyCode", verifyCode)
router.post("/login", loginUser )
router.post("/logout", verifyJWT, logOutUser);
router.get("/user-details", verifyJWT, getUserDetails)
router.post("/refresh-token", refreshAccessToken)
router.post("/change-password", verifyJWT, changePassword)
router.patch("/change-avatar", verifyJWT, upload.single("avatar"), updateUserAvatar)
router.patch("/update-details", verifyJWT, updateAccountDetails)

export default router