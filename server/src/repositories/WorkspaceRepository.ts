import Workspace from "../models/workspace.model.ts";

export default class WorkspaceRepo {
    static createWorkspace = async (name: string, description: string, type: string, visibility: string, userId: string, workspaceMembers: any[], avatar?: string) => {
        const workspace = new Workspace({
            name,
            description: description || `${type} workspace`,
            type: type || 'personal',
            visibility: visibility || 'private',
            avatar: avatar,
            owner: userId,
            members: workspaceMembers,
            settings: {
                allowMembersInvite: false,
                allowMembersCreateProjects: type === 'team',
                defaultMemberRole: 'member',
                isArchived: false
            },
            stats: {
                totalProjects: 0,
                totalTasks: 0,
                completedTasks: 0,
                totalMembers: workspaceMembers.length
            }
        });

        await workspace.save();
        return workspace;
    }

    static getWorkspaces = async (userId: string) => {
        const workspaces = await Workspace.find({
            $or: [
                { owner: userId },
                { 'members.user': userId }
            ]
        })
            .populate('owner', 'fullName email avatar')
            .populate('members.user', 'fullName email avatar')
            .sort({ lastActive: -1 });

        return workspaces;
    }
}