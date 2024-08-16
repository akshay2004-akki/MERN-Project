import { Router } from 'express';
import {
    toggleBlogLike, getLikes
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.post("/toggle/t/:blogId", verifyJWT,toggleBlogLike);
router.route("/:blogId").get(verifyJWT,getLikes);

export default router