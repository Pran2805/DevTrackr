import type { Request, Response } from "express";
import WorkspaceRepo from "../repositories/WorkspaceRepository.ts";
import WorkspaceService from "../services/WorkspaceService.ts";
import UserRepository from "../repositories/userRepository.ts";
import Cloudinary from "../services/CloudinaryService.ts";

export default class WorkspaceController {
    static createWorkspace = async (req: Request, res: Response) => {
        try {
            const { name, description, type, visibility, members = [] } = req.body;
            const userId = req.user?._id;
            const file = req?.file

            if (!name) {
                throw new Error("Workspace name is required")
            }

            if (!userId) {
                throw new Error("Unauthorized: User not found");
            }

            let avatar = null;
            if (file) {
                avatar = await Cloudinary.addWorkspaceAvatar(file.path);
            }
            const workspaceMembers: any[] = WorkspaceService.roleAssign(userId.toString(), members);

            const workspace = await WorkspaceRepo.createWorkspace(name, description, type, visibility, userId.toString(), workspaceMembers, avatar?.secure_url)

            UserRepository.addUserInWorkspace(userId, workspace);
            UserRepository.addMembersInWorkspace(members, workspace);

            return res.status(201).json({
                success: true,
                message: "Workspace created successfully",
                data: workspace
            });

        } catch (error) {
            console.error("Create workspace error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static getMyWorkspaces = async (req: Request, res: Response) => {
        try {
            const userId = req.user?._id;

            if (!userId) {
                throw new Error("Unauthorized: User not found");
            }

            const workspaces = await WorkspaceRepo.getWorkspaces(userId)

            return res.status(200).json({
                success: true,
                data: workspaces,
                workspaces
            });

        } catch (error) {
            console.error("Get workspaces error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };


    static updateWorkspace = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.error("Update workspace error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static deleteWorkspace = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.error("Delete Workspace error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static addMembers = async (req: Request, res: Response) => {
        try {


        } catch (error) {
            console.error("Add member error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static removeMember = async (req: Request, res: Response) => {
        try {


        } catch (error) {
            console.error("Remove member error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static updateMemberRole = async (req: Request, res: Response) => {
        try {


        } catch (error) {
            console.error("Update member role error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static leaveWorkspace = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.error("Leave workspace error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    static getWorkspaceMembers = async (req: Request, res: Response) => {
        try {

        } catch (error) {
            console.error("Get members error:", error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: error instanceof Error ? error.message : error
            });
        }
    };

    // static transferOwnership = async (req: Request, res: Response) => {
    //     try {


    //     } catch (error) {
    //         console.error("Transfer ownership error:", error);
    //         return res.status(500).json({
    //             success: false,
    //             message: "Internal Server Error",
    //             error: error instanceof Error ? error.message : error
    //         });
    //     }
    // };
}