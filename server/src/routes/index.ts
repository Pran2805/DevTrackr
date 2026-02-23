import { Router } from "express";
import authRouter from "./auth.route.ts"

const router = Router()

router.use("/auth", authRouter)

export default router;