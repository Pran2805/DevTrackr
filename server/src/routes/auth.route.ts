import { Router } from "express";
import AuthController from "../controllers/AuthController.ts";

const router = Router()

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/resend", AuthController.resendOtp)
router.post("/verify", AuthController.verifyOtp)

export default router;