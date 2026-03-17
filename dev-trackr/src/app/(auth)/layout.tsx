

import { Computer } from "lucide-react"
import React from "react"

interface AuthLayoutType {
    children: React.ReactNode
}

function AuthLayout({ children }: AuthLayoutType) {
    return (
        <div className="min-h-screen flex flex-col">
            <nav className="flex items-center justify-between px-6 py-4 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60">

                <div className="flex items-center gap-3">
                    <div className="size-10 bg-primary rounded-xl flex items-center justify-center shadow-sm">
                        <Computer className="size-6 text-primary-foreground" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight">
                        DevTrackr
                    </span>
                </div>

                <div>
                    <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition">
                        Sign Up
                    </button>
                </div>
            </nav>

            <main className="flex-1 flex items-center justify-center">
                {children}
            </main>
        </div>
    )
}

export default AuthLayout