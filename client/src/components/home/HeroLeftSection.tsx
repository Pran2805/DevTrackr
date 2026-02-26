import { memo } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

const HeroLeftSection = memo(() => {
    return (
        <div className="flex-1 space-y-8 text-center md:text-left">
            <Badge className="bg-primary-foreground border-2 py-2 border-slate-200">
                <span className="text-slate-600">✨ New: AI-powered project insights</span>
                <ArrowRight className="ml-2 size-4 text-slate-900" />

            </Badge>

            <h1 className="space-y-2">
                <span className="block text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                    Manage Projects with
                </span>
                <span className="block bg-linear-to-r from-slate-900 via-slate-700 to-slate-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent md:text-5xl lg:text-6xl">
                    Precision.
                </span>
                <span className="block text-4xl font-bold tracking-tight text-slate-900 md:text-5xl lg:text-6xl">
                    Deliver with Confidence.
                </span>
            </h1>

            <p className="mx-auto max-w-2xl text-base text-slate-600 md:mx-0 md:text-lg lg:text-xl">
                Plan, track and optimize every milestone with intelligent workflows
                and real-time collaboration. Transform how your team delivers projects.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-8 pt-4 md:justify-start">
                <div className="text-center md:text-left">
                    <div className="text-2xl font-bold text-slate-900">10k+</div>
                    <div className="text-sm text-slate-600">Active Users</div>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center md:text-left">
                    <div className="text-2xl font-bold text-slate-900">98%</div>
                    <div className="text-sm text-slate-600">Satisfaction</div>
                </div>
                <div className="h-12 w-px bg-slate-200" />
                <div className="text-center md:text-left">
                    <div className="text-2xl font-bold text-slate-900">24/7</div>
                    <div className="text-sm text-slate-600">Support</div>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row md:justify-start">
                <Button
                    size="lg"
                    className="group w-full bg-linear-to-r from-slate-900 to-slate-700 px-8 py-6 text-base font-medium text-white shadow-xl transition-all hover:from-slate-800 hover:to-slate-600 hover:shadow-2xl sm:w-auto"
                >
                    Get Started
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                </Button>
            </div>

        </div>
    )
})

export default HeroLeftSection
