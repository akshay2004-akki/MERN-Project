import {Router} from 'express'
import {verifyJWT} from '../middlewares/auth.middleware.js'
import { regiterWbinar } from '../controllers/webinar.cotroller.js'

const router = Router()

router.post("/register", regiterWbinar)

export default router