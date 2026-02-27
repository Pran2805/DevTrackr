import { Bell, Search } from "lucide-react"
import { Card } from "../ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Input } from "../ui/input"
import { Badge } from "../ui/badge"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

function Navbar() {
    const [workspaces] = useState([
        { id: "1", name: "Team's Workspace" },
        { id: "2", name: "Team's-2 Workspace" }
    ])

    const user = {
        avatar: "https://github.com/pranav-2805.png",
        name: "Pranav Shinde",
        email: "pranavshinde.as@gmail.com"
    }

    const notification: { count: number } = {
        count: 3
    }

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur-xl shadow-sm">
            <nav className="flex h-20 items-center justify-between px-6">
                <div className="flex items-center gap-4">
                    <Select defaultValue="1">
                        <SelectTrigger className="w-56 border-slate-200 bg-white/50">
                            <SelectValue placeholder="Select Workspace" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {workspaces.map(workspace => (
                                    <SelectItem key={workspace.id} value={workspace.id}>
                                        {workspace.name}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-slate-400" />
                        <Input
                            placeholder="Search tasks, projects, members..."
                            className="w-full pl-10 border-slate-200 bg-white/50"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Card className="p-2.5 hover:bg-slate-50 cursor-pointer transition-colors border-slate-200">
                            <Bell className="size-5 text-slate-600" />
                        </Card>
                        {notification.count > 0 && (
                            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                                {notification.count}
                            </Badge>
                        )}
                    </div>

                    <div className="flex items-center gap-3 pl-2 border-l border-slate-200">
                        <Avatar className="h-9 w-9 cursor-pointer hover:opacity-80 transition-opacity">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-slate-200 text-slate-700">
                                {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-slate-900">{user.name}</p>
                            <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Navbar