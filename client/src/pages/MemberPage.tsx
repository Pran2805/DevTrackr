import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { UserPlus, Search, Mail, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function MemberPage() {
    const [members] = useState([
        { id: 1, name: "Pranav Shinde", email: "pranav@example.com", role: "Admin", status: "active", avatar: "https://github.com/pranav-2805.png" },
        { id: 2, name: "John Doe", email: "john@example.com", role: "Member", status: "active", avatar: "" },
        { id: 3, name: "Jane Smith", email: "jane@example.com", role: "Member", status: "away", avatar: "" },
        { id: 4, name: "Mike Johnson", email: "mike@example.com", role: "Viewer", status: "offline", avatar: "" },
    ]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Team Members</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your team members and their roles
                    </p>
                </div>
                <Button className="gap-2">
                    <UserPlus className="size-4" />
                    Invite Member
                </Button>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                <Input placeholder="Search members..." className="pl-9 max-w-md" />
            </div>

            {/* Members Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {members.map((member) => (
                    <Card key={member.id} className="hover:shadow-lg transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={member.avatar} />
                                        <AvatarFallback className="bg-primary/10">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <h3 className="font-semibold">{member.name}</h3>
                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge variant="outline">{member.role}</Badge>
                                            <Badge className={`
                                                ${member.status === 'active' ? 'bg-green-500' : 
                                                  member.status === 'away' ? 'bg-yellow-500' : 'bg-gray-500'} 
                                                text-white text-xs
                                            `}>
                                                {member.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="size-4" />
                                </Button>
                            </div>
                            
                            <div className="flex gap-2 mt-4 pt-4 border-t">
                                <Button variant="outline" size="sm" className="flex-1 gap-2">
                                    <Mail className="size-4" />
                                    Message
                                </Button>
                                <Button variant="outline" size="sm" className="flex-1">
                                    View Profile
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}