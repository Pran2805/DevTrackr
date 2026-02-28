export default class WorkspaceService {
    static roleAssign = (userId: string, members: any[]) => {
        const workspaceMembers = [
            {
                user: userId,
                role: 'admin',
                joinedAt: new Date()
            },
            ...members.map((member: any) => ({
                user: member.userId,
                role: member.role || 'member',
                joinedAt: new Date()
            }))

        ];
        return workspaceMembers;
    }
}