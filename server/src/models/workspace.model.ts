import mongoose, { Schema, Document } from 'mongoose'

export interface IWorkspace extends Document {
    name: string
    description: string
    type: 'personal' | 'team' | 'client' | 'education'
    visibility: 'private' | 'team' | 'public'
    avatar: string
    owner: mongoose.Types.ObjectId | string
    members: {
        user: mongoose.Types.ObjectId | string
        role: 'admin' | 'member' | 'viewer'
        joinedAt: Date
        invitedBy?: mongoose.Types.ObjectId | string
    }[]
    pendingInvites?: {
        email: string
        role: 'admin' | 'member' | 'viewer'
        invitedAt: Date
        invitedBy: mongoose.Types.ObjectId | string
        token?: string
    }[]
    projects: mongoose.Types.ObjectId[]
    settings: {
        allowMembersInvite: boolean
        allowMembersCreateProjects: boolean
        defaultMemberRole: 'member' | 'viewer'
        isArchived: boolean
    }
    stats: {
        totalProjects: number
        totalTasks: number
        completedTasks: number
        totalMembers: number
    }
    createdAt: Date
    updatedAt: Date
    lastActive: Date
}

const workspaceSchema = new Schema<IWorkspace>({
    name: {
        type: String,
        required: [true, "Workspace name is required"],
        minlength: [3, "Minimum 3 characters are required"],
        maxlength: [50, "Maximum 50 characters are allowed"],
        trim: true
    },
    description: {
        type: String,
        maxlength: [500, "Maximum 500 characters are allowed"],
        default: ""
    },
    type: {
        type: String,
        enum: ['personal', 'team', 'client', 'education'],
        default: 'personal'
    },
    visibility: {
        type: String,
        enum: ['private', 'team', 'public'],
        default: 'private'
    },
    avatar: {
        type: String,
        default: "https://github.com/pranav-2805.png"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'member', 'viewer'],
            default: 'member'
        },
        joinedAt: {
            type: Date,
            default: Date.now
        },
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    }],
    pendingInvites: [{
        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },
        role: {
            type: String,
            enum: ['admin', 'member', 'viewer'],
            default: 'member'
        },
        invitedAt: {
            type: Date,
            default: Date.now
        },
        invitedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        token: {
            type: String,
            unique: true,
            sparse: true
        }
    }],
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }],
    settings: {
        allowMembersInvite: {
            type: Boolean,
            default: false
        },
        allowMembersCreateProjects: {
            type: Boolean,
            default: false
        },
        defaultMemberRole: {
            type: String,
            enum: ['member', 'viewer'],
            default: 'member'
        },
        isArchived: {
            type: Boolean,
            default: false
        }
    },
    stats: {
        totalProjects: {
            type: Number,
            default: 0
        },
        totalTasks: {
            type: Number,
            default: 0
        },
        completedTasks: {
            type: Number,
            default: 0
        },
        totalMembers: {
            type: Number,
            default: 1 // Creator counts as first member
        }
    },
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

workspaceSchema.index({ owner: 1 });
workspaceSchema.index({ 'members.user': 1 });
workspaceSchema.index({ 'pendingInvites.email': 1 });
workspaceSchema.index({ type: 1, visibility: 1 });


const Workspace = mongoose.model<IWorkspace>("Workspace", workspaceSchema);
export default Workspace;