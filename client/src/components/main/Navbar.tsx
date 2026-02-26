import { Bell, User } from "lucide-react"
import { Card } from "../ui/card"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl shadow-md">
            <nav className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div>
                    <Select>
                        <SelectTrigger className="w-45">
                            <SelectValue placeholder="Select Workspace" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="1">Team's Workspace</SelectItem>
                                <SelectItem value="2">Team's-2 Workspace</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>


                <div className="flex gap-x-4">
                    <div>

                        <Card className="p-3 -z-10">
                            <Bell className="z-50 size-6 text-foreground" />
                        </Card>
                    </div>
                    <div>
                        <Card className="p-3 -z-10">
                            <User className="z-50 size-6 text-foreground" />
                        </Card>
                    </div>


                </div>


            </nav>
        </header>
    )
}

export default Navbar
