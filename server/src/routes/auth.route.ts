import { Router } from "express";
import AuthController from "../controllers/AuthController.ts";
import { isProtected } from "../middlewares/auth.middleware.ts";

const router = Router()

router.post("/signup", AuthController.signup)
router.post("/login", AuthController.login)
router.post("/resend", AuthController.resendOtp)
router.post("/verify", AuthController.verifyOtp)
router.post("/me", isProtected, AuthController.isLogin)

export default router;