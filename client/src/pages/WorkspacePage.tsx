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

export default function WorkspacePage() {
    const myWorkspace = [
        {
            name: "My Workspace",
            desc: "My Personal Workspace",
            img: "https://github.com/pranav-2805.png",
            members: 5,
            projects: 12
        },
        {
            name: "Team Workspace",
            desc: "Team Collaboration Space",
            img: "https://github.com/pranav-2805.png",
            members: 8,
            projects: 24
        },
        {
            name: "Client Projects",
            desc: "Client-facing workspace",
            img: "https://github.com/pranav-2805.png",
            members: 3,
            projects: 6
        },
        {
            name: "Development",
            desc: "Dev team workspace",
            img: "https://github.com/pranav-2805.png",
            members: 12,
            projects: 18
        },
        {
            name: "Marketing",
            desc: "Marketing campaigns",
            img: "https://github.com/pranav-2805.png",
            members: 4,
            projects: 8
        },
        {
            name: "Design",
            desc: "Design team workspace",
            img: "https://github.com/pranav-2805.png",
            members: 6,
            projects: 15
        },
    ];

    const handleNewWorkspace = () => {
        // Add your logic for creating new workspace
        console.log("Creating new workspace...");
    };

    const handleWorkspaceClick = (workspaceName: string) => {
        // Add your logic for workspace navigation
        console.log(`Navigating to ${workspaceName}...`);
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
                {myWorkspace && myWorkspace.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {myWorkspace.map((workspace, index) => (
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
                                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                    Edit Workspace
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                                    Duplicate
                                                </DropdownMenuItem>
                                                <DropdownMenuItem 
                                                    className="text-red-600"
                                                    onClick={(e) => e.stopPropagation()}
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
        </div>
    );
}