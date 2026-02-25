import { FileUser } from "lucide-react";
import { memo } from "react";
import { Link } from "react-router-dom";

const Footer = memo(() => {
    const projectName = import.meta.env.VITE_PROJECT_NAME;

    return (
        <footer className="relative border-t border-slate-200 bg-white">
            {/* Background linear */}
            <div className="absolute inset-0 -z-10 bg-linear-to-b from-slate-50/50 to-white" />

            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
                    {/* Brand column */}
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-3">
                            <div className="rounded-lg bg-linear-to-br from-slate-900 to-slate-700 p-2">
                                <FileUser className="size-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-slate-900">
                                {projectName}
                            </span>
                        </div>
                        <p className="mt-4 max-w-md text-sm text-slate-600">
                            Transform your project management experience with intelligent workflows,
                            real-time collaboration, and data-driven insights.
                        </p>
                    </div>
                </div>

                <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 text-center md:flex-row">
                    <p className="text-xs text-slate-500">
                        © 2026 {projectName}. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <Link to="/privacy" className="text-xs text-slate-500 hover:text-slate-900">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-xs text-slate-500 hover:text-slate-900">
                            Terms of Service
                        </Link>
                        <Link to="/cookies" className="text-xs text-slate-500 hover:text-slate-900">
                            Cookie Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
})

export default Footer;