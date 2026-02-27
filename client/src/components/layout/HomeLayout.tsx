import Navbar from "../main/Navbar";
import LeftMenu from "../main/LeftMenu";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <div className="min-h-screen flex bg-slate-50">
            <div className="shrink-0">
                <LeftMenu />
            </div>

            <div className="flex-1 flex flex-col ml-64">
                <div className="sticky top-0 z-40">
                    <Navbar />
                </div>

                <main className="flex-1 p-6 overflow-auto">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}