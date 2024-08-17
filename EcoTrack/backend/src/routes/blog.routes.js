import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { createPost, deletePost, getAllPosts, getPostById, getUserPosts, updatePost } from "../controllers/blog.controller.js";

const router = Router();

router.post("/create-blog" ,upload.fields([
    {
        name : "coverImage",
        maxCount : 1
    }
]), verifyJWT ,createPost) 
router.patch("/:blogId", verifyJWT, updatePost)
router.get("/getPosts", verifyJWT, getUserPosts)
router.delete("/:blogId", deletePost)
router.get("/getAllBlogs", getAllPosts)
router.get("/:blogId", verifyJWT, getPostById)


export default router