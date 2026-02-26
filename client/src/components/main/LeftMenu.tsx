import { LayoutDashboard, ListCheck, Settings, Trophy, Users } from "lucide-react"
import { Button } from "../ui/button"

function LeftMenu() {

    const items = [
        {
            name: "Dashboard",
            icon: LayoutDashboard
        },
        {
            name: "WorkSpaces",
            icon: Users
        },
        {
            name: "My Tasks",
            icon: ListCheck
        },
        {
            name: "Members",
            icon: Users
        },
        {
            name: "Achieved",
            icon: Trophy
        },
        {
            name: "Settings",
            icon: Settings
        },
    ]
    return (
        <div className="w-50 bg-white h-screen shadow-2xl">

            <div className="h-15 border-b-2">
                djkl
            </div>
            <div className="" >

                <div className="flex flex-col gap-y-5 pt-5 h-[80vh]">
                    {items && items.map((item) => (
                        <Button
                            variant="ghost"
                            className="flex gap-2 text-left"
                        >
                            <item.icon />
                            <h1>
                                {item.name}
                            </h1>
                        </Button>
                    ))}
                </div>

                <div className="items-end">
                    d
                </div>
            </div>
        </div>
    )
}

export default LeftMenu
