import { FileUser, LayoutDashboard, ListCheck, LogOut, Settings, Trophy, Users } from "lucide-react"
import { Button } from "../ui/button"
import { Link, useLocation } from "react-router-dom"

function LeftMenu() {
    const projectName = import.meta.env.VITE_PROJECT_NAME
    const location = useLocation()

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

    const handleLogout = () => {
    }

    return (
        <div className="w-64 bg-white h-screen shadow-xl fixed left-0 top-0 flex flex-col">
            <div className="h-20 border-b border-slate-200 shrink-0">
                <h1 className="text-xl font-semibold flex items-center justify-center h-full gap-3">
                    <div className="rounded-lg bg-linear-to-br from-slate-900 to-slate-700 p-2">
                        <FileUser className="size-5 text-white" />
                    </div>
                    <span className="text-slate-800">{projectName || "ProjectHub"}</span>
                </h1>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-3">
                <div className="flex flex-col gap-y-1">
                    {items.map((item, index) => {
                        const isActive = location.pathname === item.link
                        return (
                            <Link to={item.link} key={index}>
                                <Button
                                    variant={isActive ? "outline" : "ghost"}
                                    className={`w-full justify-start gap-3 h-11 ${isActive
                                            ? "bg-slate-100 text-slate-900"
                                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                                        }`}
                                >
                                    <item.icon className={`size-5 ${isActive ? "text-slate-900" : "text-slate-500"
                                        }`} />
                                    <span className="font-medium">{item.name}</span>
                                </Button>
                            </Link>
                        )
                    })}
                </div>
            </div>

            <div className="border-t border-slate-200 p-3 shrink-0">
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 h-11 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                >
                    <LogOut className="size-5" />
                    <span className="font-medium">Logout</span>
                </Button>
            </div>
        </div>
    )
}

export default LeftMenu