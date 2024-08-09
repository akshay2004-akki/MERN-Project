import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost, updatePost } from "../controllers/blog.controller.js";

const router = Router();

router.post("/create-blog", upload.fields([
    {
        name : "coverImage",
        maxCount : 2
    }
]), verifyJWT ,createPost)
router.patch("/:blogId", verifyJWT, updatePost)


export default router