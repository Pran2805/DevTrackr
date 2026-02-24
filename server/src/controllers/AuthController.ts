import type { Response, Request } from "express"
import UserRepository from "../repositories/userRepository.ts"
import AuthService from "../services/AuthService.ts"
import OtpRepository from "../repositories/OtpRepository.ts"
import MailService from "../services/MailService.ts"
import Otp from "../models/otp.model.ts"

export default class AuthController {
    static signup = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { fullName, email, password } = req.body

            if (!fullName || !email || !password) {
                return res.status(400).json({
                    message: "All fields are required!",
                    success: false
                })
            }

            const emailExists = await UserRepository.isEmailExist(email)
            // console.log(emailExists)
            if (emailExists) {
                return res.status(400).json({
                    message: "Email already exists",
                    success: false
                })
            }

            const hashPassword = await AuthService.passwordHashing(password)

            const user = await UserRepository.createUser(
                fullName,
                email,
                hashPassword
            )

            if (!user) {
                return res.status(500).json({
                    message: "Error while creating user",
                    success: false,
                })
            }
            const otp = Math.floor(100000 + Math.random() * 900000).toString()

            await OtpRepository.saveOtp(user._id, String(otp))
            await MailService.emailVerify(user.email, Number(otp))

            return res.status(201).json({
                success: true,
                message: "User created. Please verify OTP sent to email.",
                user
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    static verifyOtp = async (req: Request, res: Response) => {
        try {
            const { otp, email } = req.body

            if (!email || !otp) {
                return res.status(400).json({
                    message: "Email and OTP are required",
                    success: false
                })
            }

            const user: any = await UserRepository.isEmailExist(email)
            if (!user) {
                return res.status(400).json({
                    message: "Invalid email",
                    success: false
                })
            }

            const otpData = await OtpRepository.getData(String(user?._id))

            if (!otpData) {
                return res.status(400).json({
                    message: "OTP not found or expired",
                    success: false
                })
            }

            if (otpData.otpExpiresAt < new Date()) {
                return res.status(400).json({
                    message: "OTP expired",
                    success: false
                })
            }

            if (otp !== otpData.otp) {
                return res.status(400).json({
                    message: "Invalid OTP",
                    success: false
                })
            }

            await UserRepository.verifyUser(String(user?._id))

            await OtpRepository.deleteOtp(user._id)

            AuthService.createToken(String(user._id), res)

            return res.status(200).json({
                success: true,
                message: "Account verified successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    static login = async (req: Request, res: Response): Promise<Response> => {
        try {
            const { email, password } = req.body

            if (!email || !password) {
                return res.status(400).json({
                    message: "All fields are required",
                    success: false
                })
            }

            const user: any = await UserRepository.isEmailExist(email)

            if (!user) {
                return res.status(404).json({
                    message: "Email not exists",
                    success: false
                })
            }

            // 🔥 Prevent unverified login
            if (!user.isValid) {
                return res.status(403).json({
                    message: "Please verify your email first",
                    success: false
                })
            }

            const isPasswordCorrect = await AuthService.passwordCheck(
                password,
                user.password
            )

            if (!isPasswordCorrect) {
                return res.status(400).json({
                    message: "Incorrect password",
                    success: false
                })
            }

            AuthService.createToken(user._id.toString(), res)

            return res.status(200).json({
                success: true,
                message: "User logged in successfully"
            })

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            })
        }
    }

    static resendOtp = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            console.log(email)
            if (!email) {
                return res.status(400).json({
                    success: false,
                    message: "Email is required to send an OTP."
                });
            }

            const user = await UserRepository.isEmailExist(email)
            if (!user) {
                return res.status(400).json({
                    success: false,
                    message: "Email is not exists."
                });
            }
            let otp;
            otp = await OtpRepository.resendOtp(email, user._id);

            if (!otp) {
                return res.status(400).json({
                    success: false,
                    message: "OTP has expired or cannot be generated. We are sending new otp now"
                });
            } else {
                const code = Math.floor(100000 + Math.random() * 900000).toString()
                otp = await OtpRepository.saveOtp(user._id, String(code))
            }

            console.log("here")

            await MailService.emailVerify(email, Number(otp.otp));

            return res.status(200).json({
                success: true,
                message: "OTP sent successfully to your email."
            });

        } catch (error) {
            console.error("Resend OTP Error:", error);

            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    };
}