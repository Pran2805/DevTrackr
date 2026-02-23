import mongoose, { Schema, Types } from "mongoose"

export interface IOtp {
  user: Types.ObjectId
  otp: string
  otpExpiresAt: Date
}

const otpSchema = new Schema<IOtp>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  otpExpiresAt: {
    type: Date,
    required: true,
  },
})

// Auto delete expired OTPs
otpSchema.index({ otpExpiresAt: 1 }, { expireAfterSeconds: 0 })

const Otp = mongoose.model("Otp", otpSchema)
export default Otp