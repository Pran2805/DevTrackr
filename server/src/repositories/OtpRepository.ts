import type { Types } from "mongoose";
import Otp from "../models/otp.model.ts"

export default class OtpRepository {
    static getData = async (userId: string) => {
        const data = await Otp.findOne({ userId })
        if (!data) {
            throw new Error("Otp not exists")
        }
        return data;
    }

    static saveOtp = async (userId: Types.ObjectId, otp: string) => {
        try {
            await Otp.deleteMany({ userId })

            const otpDoc = await Otp.create({
                userId,
                otp,
                otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000),
            })

            return otpDoc
        } catch (error: any) {
            console.log(error)
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

    static resendOtp = async (
        email: string,
        userId: Types.ObjectId
    ) => {
        try {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();
            const otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);

            const otpDoc = await Otp.findOneAndUpdate(
                { userId },
                {
                    $set: { otp, otpExpiresAt }
                },
                {
                    upsert: true,
                    returnDocument: "after",
                    setDefaultsOnInsert: true,
                    select: "otp otpExpiresAt"
                }
            ).lean();

            return otpDoc;
        } catch (error) {
            console.error(error);
            throw new Error("Failed to resend OTP");
        }
    };
}
