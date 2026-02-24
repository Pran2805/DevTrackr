import nodemailer from "nodemailer"
import ENV from "../utils/env.ts"

export default class MailService {
    static transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: ENV.nodemailerEmail,
            pass: ENV.nodemailerPass,
        },
    })


    static async emailVerify(email: string, code: number): Promise<void> {
        try {
            console.log(ENV)
            const options = {
                from: `"${ENV.appName}" <${ENV.nodemailerEmail}>`,
                to: email,
                subject: "Email Verification Code",
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px;">
            <h2>Email Verification</h2>
            <p>Your verification code is:</p>
            <h1 style="letter-spacing: 5px;">${code}</h1>
            <p>This code will expire in 10 minutes.</p>
          </div>
        `,
            }

            await this.transporter.sendMail(options)

        } catch (error) {
            console.error("Email send failed:", error)
            throw new Error("Unable to send verification email")
        }
    }
}