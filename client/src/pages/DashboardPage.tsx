import LeftMenu from "@/components/main/LeftMenu";
import Navbar from "@/components/main/Navbar";

const DashboardPage = () => {
    return (
        <div className="flex">
            <div>

                <LeftMenu />
            </div>
            <div className="w-full">
                <Navbar />
            </div>
        </div>
    )
}

export default DashboardPage;