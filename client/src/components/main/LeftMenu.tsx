import { FileUser, LayoutDashboard, ListCheck, Settings, Trophy, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Link } from "react-router-dom"

function LeftMenu() {
    const projectName = import.meta.env.VITE_PROJECT_NAME

    const items = [
        {
            name: "Dashboard",
            icon: LayoutDashboard,
            link: "/dashboard"
        },
        {
            name: "Workspace",
            icon: Users,
            link: "/workspace"
        },
        {
            name: "My Tasks",
            icon: ListCheck,
            link: "/tasks"
        },
        {
            name: "Members",
            icon: Users,
            link: "/members"
        },
        {
            name: "Achieved",
            icon: Trophy,
            link: "/achieve"
        },
        {
            name: "Settings",
            icon: Settings,
            link: "/settings"
        },
    ]
    return (
        <div className="w-50 bg-white h-screen shadow-2xl">

            <div className="h-20 border-b-2">
                <h1 className="text-xl font-semibold flex items-center justify-center h-full gap-3">
                    <div className="rounded-lg bg-linear-to-br from-slate-900 to-slate-700 p-2">
                        <FileUser className="size-5 text-white" />
                    </div>
                    {projectName}
                </h1>
            </div>
            <div className="" >

                <div className="flex flex-col gap-y-5 pt-5 h-[80vh] pl-6 ">
                    {items && items.map((item) => (
                        <Link to={`${item.link}`}>
                            <Button
                                variant="ghost"
                                className="flex gap-2 text-left"
                            >
                                <item.icon />
                                <h1>
                                    {item.name}
                                </h1>
                            </Button>
                        </Link>
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
