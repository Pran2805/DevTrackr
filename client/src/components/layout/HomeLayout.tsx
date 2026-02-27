import Navbar from "../main/Navbar";
import LeftMenu from "../main/LeftMenu";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
    return (
        <div className="min-h-screen flex">

            <div className="w-50 border-r">
                <LeftMenu />
            </div>
            <div className="flex-1 flex flex-col">

                <div className="border-b">
                    <Navbar />
                </div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>

            </div>
        </div>
    )
}
