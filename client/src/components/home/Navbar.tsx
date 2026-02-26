import { ArrowRight, FileUser } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { memo } from "react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = memo(() => {
    const projectName = import.meta.env.VITE_PROJECT_NAME;
    const { isLoggedIn } = useAuth()

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

                    {
                        isLoggedIn ?
                            <>
                                <Link to="/dashboard">
                                    <Button
                                        size="lg"
                                        className="group w-full bg-linear-to-r py-6 from-slate-900 to-slate-700 text-base font-medium text-white shadow-xl transition-all hover:from-slate-800 hover:to-slate-600 hover:shadow-2xl sm:w-auto"
                                    >
                                        Get Started
                                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                                    </Button>
                                </Link>
                            </>

                            :
                            (
                                <>
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
                                </>
                            )}
                </div>

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