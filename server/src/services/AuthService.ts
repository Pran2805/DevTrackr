import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../utils/env.ts'

export default class AuthService {
    static passwordHashing = async (password: string) => {
        const salt = await bcrypt.genSalt(15)
        return bcrypt.hash(password, salt)
    }

    static createToken = (userId: string) => {
        const token = jwt.sign({ userId }, ENV.jwtSecret, {
            expiresIn: '7d'
        })

        return token;
    }

    static passwordCheck = async (password: string, hash: string) => {
        return await bcrypt.compare(password, hash)
    }
}