import type { Response, Request } from "express"
import UserRepository from "../repositories/userRepository.ts";
import AuthService from "../services/AuthService.ts";

export default class AuthController {
    static signup = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { fullName, email, password } = req.body;

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    message: "All Fields are required!",
                    success: false
                })
            }

            const emailExists = await UserRepository.isEmailExist(email)
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already Exists",
                    success: false
                })
            }

            const hashPassword: string = await AuthService.passwordHashing(password)
            const user: any = UserRepository.createUser(fullName, email, hashPassword)

            if (!user) {
                return res.status(500).json({
                    message: "Error while creating an User",
                    success: false
                })
            }

            AuthService.createToken(user._id, res)

            return res.status(201).json({
                success: true,
                data: {
                    _id: user?._id,
                    fullName: user?.fullName,
                    email: user?.email
                },
                message: "User created successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error
            })

        }
    }


    static login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: "All fields are required",
                    success: false
                })
            }

            const user: any = UserRepository.isEmailExist(email)
            if (!user) {
                return res.status(404).json({
                    message: "Email not exists",
                    success: false
                })
            }

            const isPasswordCorrect = AuthService.passwordCheck(password, user.password)
            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Incorrect Password",
                    success: false
                })
            }

            AuthService.createToken(user._id, res)

            return res.status(200).json({
                success: true,
                message: "User Login successfully"
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error
            })
        }
    }

}
