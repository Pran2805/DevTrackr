import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Users, MoreVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner"
import { CreateWorkspaceModal } from "@/components/modal/CreateWorkspaceModal";

export default function WorkspacePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [workspaces, setWorkspaces] = useState([
        {
            name: "My Workspace",
            desc: "My Personal Workspace",
            img: "https://github.com/pranav-2805.png",
            members: 5,
            projects: 12,
            type: "personal",
            visibility: "private"
        },
        {
            name: "Team Workspace",
            desc: "Team Collaboration Space",
            img: "https://github.com/pranav-2805.png",
            members: 8,
            projects: 24,
            type: "team",
            visibility: "team"
        },
        {
            name: "Client Projects",
            desc: "Client-facing workspace",
            img: "https://github.com/pranav-2805.png",
            members: 3,
            projects: 6,
            type: "client",
            visibility: "private"
        },
        {
            name: "Development",
            desc: "Dev team workspace",
            img: "https://github.com/pranav-2805.png",
            members: 12,
            projects: 18,
            type: "team",
            visibility: "team"
        },
        {
            name: "Marketing",
            desc: "Marketing campaigns",
            img: "https://github.com/pranav-2805.png",
            members: 4,
            projects: 8,
            type: "team",
            visibility: "private"
        },
        {
            name: "Design",
            desc: "Design team workspace",
            img: "https://github.com/pranav-2805.png",
            members: 6,
            projects: 15,
            type: "team",
            visibility: "team"
        },
    ]);

    const handleNewWorkspace = () => {
        setIsModalOpen(true);
    };

    const handleCreateWorkspace = (newWorkspace: any) => {
        // Add the new workspace to the list
        setWorkspaces(prev => [...prev, {
            name: newWorkspace.name,
            desc: newWorkspace.description || `${newWorkspace.type} workspace`,
            img: newWorkspace.avatar,
            members: newWorkspace.members,
            projects: newWorkspace.projects,
            type: newWorkspace.type,
            visibility: newWorkspace.visibility
        }]);

        toast.success(
            "Workspace Created! 🎉", {
            description: `"${newWorkspace.name}" has been successfully created.`,
        });

    };

    const handleWorkspaceClick = (_workspaceName: string) => {
    };

    const handleEditWorkspace = (e: React.MouseEvent, workspace: any) => {
        e.stopPropagation();
        toast("Edit Workspace", {
            description: `Editing ${workspace.name}`,
        });
    };

    const handleDuplicateWorkspace = (e: React.MouseEvent, workspace: any) => {
        e.stopPropagation();
        const duplicated = {
            ...workspace,
            name: `${workspace.name} (Copy)`,
            members: 1,
            projects: 0
        };
        setWorkspaces(prev => [...prev, duplicated]);
        toast.warning("Workspace Duplicated", {
            description: `${workspace.name} has been duplicated.`,
        });
    };

    const handleDeleteWorkspace = (e: React.MouseEvent, workspace: any) => {
        e.stopPropagation();
        if (confirm(`Are you sure you want to delete "${workspace.name}"?`)) {
            setWorkspaces(prev => prev.filter(w => w.name !== workspace.name));
            toast("Workspace Deleted", {
                description: `${workspace.name} has been removed.`,
            });
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and organize your workspaces
                    </p>
                </div>

                <Button onClick={handleNewWorkspace} className="gap-2">
                    <PlusCircle className="size-4" />
                    New Workspace
                </Button>
            </div>

            <div className="pt-4">
                {workspaces && workspaces.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {workspaces.map((workspace, index) => (
                            <Card
                                key={index}
                                className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-2 hover:border-primary/20"
                                onClick={() => handleWorkspaceClick(workspace.name)}
                            >
                                <CardHeader className="pb-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-12 w-12 rounded-lg border-2 border-muted">
                                                <AvatarImage src={workspace.img} alt={workspace.name} />
                                                <AvatarFallback className="rounded-lg bg-primary/10">
                                                    {workspace.name.split(' ').map(n => n[0]).join('')}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <CardTitle className="text-lg font-semibold">
                                                    {workspace.name}
                                                </CardTitle>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {workspace.desc}
                                                </p>
                                            </div>
                                        </div>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <MoreVertical className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={(e) => handleEditWorkspace(e, workspace)}>
                                                    Edit Workspace
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => handleDuplicateWorkspace(e, workspace)}>
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600"
                                                    onClick={(e) => handleDeleteWorkspace(e, workspace)}
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="flex gap-4 mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="size-4 text-muted-foreground" />
                                            <span className="text-sm font-medium">{workspace.members}</span>
                                            <span className="text-sm text-muted-foreground">members</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Badge variant="secondary" className="text-xs">
                                                {workspace.projects} projects
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <Badge variant="outline" className="text-xs capitalize">
                                            {workspace.type}
                                        </Badge>
                                        <Badge variant="outline" className="text-xs capitalize">
                                            {workspace.visibility}
                                        </Badge>
                                    </div>

                                    <p className="text-xs text-muted-foreground mt-3">
                                        Last active 2 hours ago
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <div className="flex justify-center mb-4">
                            <div className="p-4 bg-muted rounded-full">
                                <Users className="size-8 text-muted-foreground" />
                            </div>
                        </div>
                        <h3 className="text-lg font-semibold">No workspaces yet</h3>
                        <p className="text-muted-foreground mt-1 mb-4">
                            Create your first workspace to get started
                        </p>
                        <Button onClick={handleNewWorkspace} variant="outline" className="gap-2">
                            <PlusCircle className="size-4" />
                            Create Workspace
                        </Button>
                    </div>
                )}
            </div>

            <CreateWorkspaceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onCreateWorkspace={handleCreateWorkspace}
            />
        </div>
    );
}