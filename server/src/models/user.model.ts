import type { password } from 'bun'
import mongoose, { Schema } from 'mongoose'

export interface IUser {
    fullName: string
    email: string
    password: string
    isValid: boolean
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: true,
        min: [3, "Minimum 3 characters are required"],

    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: [3, "Minimum 3 characters are required"],
        trim: true
    },
    password: {
        type: String,
        required: true,
        min: [6, "Minimum 6 characters are required"]
    },
    isValid: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.model("User", userSchema)
export default User;