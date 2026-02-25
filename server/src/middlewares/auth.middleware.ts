import { type NextFunction, type Request, type Response } from "express";
import jwt from 'jsonwebtoken';
import ENV from "../utils/env.ts";
import UserRepository from "../repositories/userRepository.ts";


declare global {
    namespace Express {
        interface Request {
            user?: any
        }
    }
}

export const isProtected = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies?.auth; 
        if (!token) {
            return res.status(401).json({
                message: "User is not authenticated",
                success: false
            });
        }

        const decoded = jwt.verify(token, ENV.jwtSecret) as { userId: string };
        
        if (!decoded || !decoded.userId) {
            return res.status(401).json({ 
                message: "Invalid token",
                success: false
            });
        }
        const user = await UserRepository.findUserById(decoded.userId);
        
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false
            });
        }

        req.user = user;
        next();

    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                message: "Invalid token",
                success: false,
                error: error.message
            });
        }
        
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: "Token expired",
                success: false
            });
        }

        console.error("Auth middleware error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};