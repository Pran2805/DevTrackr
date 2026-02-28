import { Router } from "express";
import { isProtected } from "../middlewares/auth.middleware.ts";
import WorkspaceController from "../controllers/WorkspaceController.ts";
import upload from "../middlewares/multer.middleware.ts";

const router = Router()

router.use(isProtected)

router.post("/create", upload.single('avatar'), WorkspaceController.createWorkspace)
router.get("/", WorkspaceController.getMyWorkspaces)
router.get("/create", WorkspaceController.getWorkspaceMembers)

router.put("/update/:id", WorkspaceController.updateMemberRole)
router.delete("/:id", WorkspaceController.deleteWorkspace)

router.patch("/member/add", WorkspaceController.addMembers)
router.patch("/member/remove", WorkspaceController.removeMember)
router.patch("/member/update", WorkspaceController.updateMemberRole)

router.post("/leave", WorkspaceController.leaveWorkspace)



export default router;