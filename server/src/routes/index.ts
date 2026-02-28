import { Router } from "express";
import authRouter from "./auth.route.ts"
import workspaceRouter from "./workspace.route.ts"

const router = Router()

router.use("/auth", authRouter)
router.use("/workspace", workspaceRouter)

export default router;