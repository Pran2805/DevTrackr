import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Upload, X, UserPlus, Search } from "lucide-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CreateWorkspaceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreateWorkspace: (workspaceData: any) => void;
}

interface Member {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    role: "admin" | "member" | "viewer";
}

export function CreateWorkspaceModal({ isOpen, onClose, onCreateWorkspace }: CreateWorkspaceModalProps) {
    const [workspaceData, setWorkspaceData] = useState({
        name: "",
        description: "",
        type: "personal",
        visibility: "private",
        avatar: ""
    });
    const [_avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState("");
    
    // Members state
    const [members, setMembers] = useState<Member[]>([
        {
            id: "1",
            name: "Pranav Shinde",
            email: "pranav@example.com",
            avatar: "https://github.com/pranav-2805.png",
            role: "admin"
        }
    ]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"admin" | "member" | "viewer">("member");
    const [searchTerm, setSearchTerm] = useState("");

    // Mock users for demonstration
    const availableUsers = [
        { id: "2", name: "John Doe", email: "john@example.com", avatar: "" },
        { id: "3", name: "Jane Smith", email: "jane@example.com", avatar: "" },
        { id: "4", name: "Mike Johnson", email: "mike@example.com", avatar: "" },
        { id: "5", name: "Sarah Wilson", email: "sarah@example.com", avatar: "" },
        { id: "6", name: "Alex Brown", email: "alex@example.com", avatar: "" },
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setWorkspaceData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setWorkspaceData(prev => ({ ...prev, [name]: value }));
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setAvatarFile(null);
        setAvatarPreview("");
    };

    // Member management functions
    const addMember = (user: typeof availableUsers[0]) => {
        if (!members.find(m => m.id === user.id)) {
            const newMember: Member = {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                role: inviteRole
            };
            setMembers([...members, newMember]);
        }
    };

    const removeMember = (memberId: string) => {
        setMembers(members.filter(m => m.id !== memberId));
    };

    const updateMemberRole = (memberId: string, newRole: "admin" | "member" | "viewer") => {
        setMembers(members.map(m => 
            m.id === memberId ? { ...m, role: newRole } : m
        ));
    };

    const handleInviteByEmail = () => {
        if (inviteEmail && !members.find(m => m.email === inviteEmail)) {
            const newMember: Member = {
                id: `email-${Date.now()}`,
                name: inviteEmail.split('@')[0],
                email: inviteEmail,
                role: inviteRole
            };
            setMembers([...members, newMember]);
            setInviteEmail("");
        }
    };

    const handleSubmit = () => {
        // Validate form
        if (!workspaceData.name.trim()) {
            alert("Workspace name is required");
            return;
        }

        // Create workspace object with members
        const newWorkspace = {
            ...workspaceData,
            avatar: avatarPreview || "https://github.com/pranav-2805.png",
            members: members.length,
            memberDetails: members,
            projects: 0,
            createdAt: new Date().toISOString()
        };

        onCreateWorkspace(newWorkspace);
        resetForm();
        onClose();
    };

    const resetForm = () => {
        setWorkspaceData({
            name: "",
            description: "",
            type: "personal",
            visibility: "private",
            avatar: ""
        });
        setAvatarFile(null);
        setAvatarPreview("");
        setMembers([{
            id: "1",
            name: "Pranav Shinde",
            email: "pranav@example.com",
            avatar: "https://github.com/pranav-2805.png",
            role: "admin"
        }]);
        setInviteEmail("");
        setInviteRole("member");
        setSearchTerm("");
    };

    const filteredUsers = availableUsers.filter(user => 
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                <DialogHeader>
                    <DialogTitle className="text-2xl">Create New Workspace</DialogTitle>
                    <DialogDescription>
                        Create a new workspace to organize your projects and collaborate with your team.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="flex-1 overflow-y-auto pr-4">
                    <div className="grid gap-6 py-4">
                        {/* Avatar Upload */}
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <Avatar className="h-16 w-16 rounded-lg border-2 border-muted">
                                    <AvatarImage src={avatarPreview} />
                                    <AvatarFallback className="rounded-lg bg-primary/10 text-lg">
                                        {workspaceData.name ? workspaceData.name[0].toUpperCase() : "WS"}
                                    </AvatarFallback>
                                </Avatar>
                                {avatarPreview && (
                                    <Button
                                        variant="destructive"
                                        size="icon"
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                        onClick={removeAvatar}
                                    >
                                        <X className="h-3 w-3" />
                                    </Button>
                                )}
                            </div>
                            <div className="flex-1">
                                <Label htmlFor="avatar" className="cursor-pointer">
                                    <div className="flex items-center gap-2 p-2 border-2 border-dashed rounded-lg hover:bg-muted/50 transition-colors">
                                        <Upload className="h-4 w-4 text-muted-foreground" />
                                        <span className="text-sm text-muted-foreground">
                                            Upload workspace logo
                                        </span>
                                    </div>
                                    <Input
                                        id="avatar"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={handleAvatarChange}
                                    />
                                </Label>
                            </div>
                        </div>

                        {/* Workspace Details */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="required">
                                Workspace Name
                            </Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="e.g., Marketing Team, Client Project"
                                value={workspaceData.name}
                                onChange={handleInputChange}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="What's this workspace about?"
                                value={workspaceData.description}
                                onChange={handleInputChange}
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type">Workspace Type</Label>
                                <Select 
                                    value={workspaceData.type} 
                                    onValueChange={(value) => handleSelectChange("type", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="personal">Personal</SelectItem>
                                        <SelectItem value="team">Team</SelectItem>
                                        <SelectItem value="client">Client</SelectItem>
                                        <SelectItem value="education">Education</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="visibility">Visibility</Label>
                                <Select 
                                    value={workspaceData.visibility} 
                                    onValueChange={(value) => handleSelectChange("visibility", value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select visibility" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="private">Private</SelectItem>
                                        <SelectItem value="team">Team</SelectItem>
                                        <SelectItem value="public">Public</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Members Section */}
                        <div className="space-y-4 border rounded-lg p-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-semibold">Team Members</Label>
                                <Badge variant="secondary">{members.length} members</Badge>
                            </div>

                            {/* Current Members List */}
                            <div className="space-y-2">
                                {members.map((member) => (
                                    <div key={member.id} className="flex items-center justify-between p-2 bg-muted/30 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={member.avatar} />
                                                <AvatarFallback className="bg-primary/10">
                                                    {member.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="text-sm font-medium">{member.name}</p>
                                                <p className="text-xs text-muted-foreground">{member.email}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Select 
                                                value={member.role}
                                                onValueChange={(value: any) => updateMemberRole(member.id, value)}
                                            >
                                                <SelectTrigger className="h-8 w-24">
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="admin">Admin</SelectItem>
                                                    <SelectItem value="member">Member</SelectItem>
                                                    <SelectItem value="viewer">Viewer</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {member.id !== "1" && (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    onClick={() => removeMember(member.id)}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Invite by Email */}
                            <div className="space-y-2 pt-2 border-t">
                                <Label>Invite by Email</Label>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder="Enter email address"
                                        value={inviteEmail}
                                        onChange={(e) => setInviteEmail(e.target.value)}
                                        className="flex-1"
                                    />
                                    <Select value={inviteRole} onValueChange={(value: any) => setInviteRole(value)}>
                                        <SelectTrigger className="w-24">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Admin</SelectItem>
                                            <SelectItem value="member">Member</SelectItem>
                                            <SelectItem value="viewer">Viewer</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <Button 
                                        variant="outline" 
                                        size="icon"
                                        onClick={handleInviteByEmail}
                                        disabled={!inviteEmail}
                                    >
                                        <UserPlus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Search and Add from Organization */}
                            <div className="space-y-2">
                                <Label>Add from Organization</Label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search members..."
                                        className="pl-9"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <ScrollArea className="h-32 border rounded-lg p-2">
                                    {filteredUsers.map((user) => (
                                        <div key={user.id} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarFallback className="bg-primary/10 text-xs">
                                                        {user.name.split(' ').map(n => n[0]).join('')}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="text-sm">{user.name}</p>
                                                    <p className="text-xs text-muted-foreground">{user.email}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="h-7 px-2"
                                                onClick={() => addMember(user)}
                                                disabled={!!members.find(m => m.id === user.id)}
                                            >
                                                <PlusCircle className="h-3 w-3 mr-1" />
                                                Add
                                            </Button>
                                        </div>
                                    ))}
                                </ScrollArea>
                            </div>
                        </div>
                    </div>
                </ScrollArea>

                <DialogFooter className="gap-2 sm:gap-0 pt-4 border-t">
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit} className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Create Workspace
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}