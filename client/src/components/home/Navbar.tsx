import { FileUser } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { memo } from "react";

const Navbar = memo(() => {
    const projectName = import.meta.env.VITE_PROJECT_NAME;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <nav className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <div className="rounded-lg bg-linear-to-br from-slate-900 to-slate-700 p-2">
                        <FileUser className="size-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-900 md:text-2xl">
                        {projectName}
                    </span>
                </Link>

                <div className="flex items-center gap-4">
                    <Button
                        variant="ghost"
                        size="lg"
                        className="hidden text-slate-600 hover:bg-slate-100 hover:text-slate-900 sm:inline-flex"
                        asChild
                    >
                        <Link to="/login">
                            Log in
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        className="bg-linear-to-r from-slate-900 to-slate-700 text-white shadow-lg transition-all hover:from-slate-800 hover:to-slate-600 hover:shadow-xl"
                        asChild
                    >
                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </Button>
                </div>

                {/* Mobile menu button - Optional */}
                <Button variant="ghost" size="icon" className="md:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </Button>
            </nav>
        </header>
    );
})

export default Navbar;