import { Router } from 'express';
import {
    toggleBlogLike, getLikes
} from "../controllers/like.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file


router.post("/toggle/t/:blogId",toggleBlogLike);
router.route("/:blogId").get(getLikes);

export default router