import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../utils/env.ts'
import type { Response } from 'express'

export default class AuthService {
    static passwordHashing = async (password: string) => {
        const salt = await bcrypt.genSalt(15)
        return bcrypt.hash(password, salt)
    }

    static createToken = (userId: string, res: Response) => {
        const token = jwt.sign({ "userId": userId }, ENV.jwtSecret, {
            expiresIn: '7d'
        })

        return res.cookie("auth", token, {
            httpOnly: true,
            secure: ENV.nodeEnv === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
    }

    static passwordCheck = async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash)
    }
}