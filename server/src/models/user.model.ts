import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
    fullName: string
    email: string
    password: string
    avatar?: string
    role: 'admin' | 'member' | 'viewer'
    isValid: boolean
    createdAt: Date
    updatedAt: Date
    lastActive: Date
    workspaces: mongoose.Types.ObjectId[]
    preferences: {
        theme: 'light' | 'dark' | 'system'
        notifications: boolean
        emailUpdates: boolean
    }
}

const userSchema = new Schema<IUser>({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minlength: [3, "Minimum 3 characters are required"],
        maxlength: [50, "Maximum 50 characters are allowed"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Minimum 6 characters are required"],
        select: false 
    },
    avatar: {
        type: String,
        default: "https://github.com/shadcn.png"
    },
    role: {
        type: String,
        enum: ['admin', 'member', 'viewer'],
        default: 'member'
    },
    isValid: {
        type: Boolean,
        default: false
    },
    lastActive: {
        type: Date,
        default: Date.now
    },
    workspaces: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace'
    }],
    preferences: {
        notifications: {
            type: Boolean,
            default: true
        },
        emailUpdates: {
            type: Boolean,
            default: true
        }
    }
}, {
    timestamps: true
})

// userSchema.index({ email: 1 }); //duplicate issue that's why removed
userSchema.index({ workspaces: 1 });

const User = mongoose.model<IUser>("User", userSchema)
export default User;