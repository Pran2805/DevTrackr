import Otp from "../models/otp.model.ts"

export default class OtpRepository {
    static getData = async (email: string) => {
        const data = await Otp.findOne({ email })
        if (!data) {
            throw new Error("Otp not exists")
        }
        return data;
    }

    static saveOtp = async (userId: string, otp: string) => {
        try {
            await Otp.deleteMany({ user: userId })

            const otpDoc = await Otp.create({
                user: userId,
                otp,
                otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
            })

            return otpDoc
        } catch (error) {
            throw new Error("Failed to save OTP")
        }
    }


    static deleteOtp = async (userId: string) => {
        try {
            await Otp.deleteMany({ user: userId })
        } catch (error) {
            throw new Error("Failed to delete OTP")
        }
    }
}