import { memo } from "react"

const HeroRightSection = memo(() => {
    return (
        <div className="mt-12 flex-1 md:mt-0">
            <div className="relative">
                <div className="relative rounded-2xl border border-slate-200 bg-white/80 p-4 shadow-2xl backdrop-blur-sm">

                    <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-4">
                        <div className="flex gap-1.5">
                            <div className="size-3 rounded-full bg-slate-300" />
                            <div className="size-3 rounded-full bg-slate-300" />
                            <div className="size-3 rounded-full bg-slate-300" />
                        </div>
                        <div className="text-sm text-slate-400">Project Dashboard</div>
                    </div>

                    <div className="space-y-4">
                        <div className="h-24 w-full rounded-lg bg-linear-to-r from-slate-100 to-slate-200" />
                        <div className="flex gap-4">
                            <div className="h-16 w-1/3 rounded-lg bg-slate-300" />
                            <div className="h-16 w-1/3 rounded-lg bg-slate-300" />
                            <div className="h-16 w-1/3 rounded-lg bg-slate-300" />
                        </div>
                        <div className="h-32 w-full rounded-lg bg-slate-300" />
                    </div>
                </div>

                <div className="absolute -left-4 -top-4 h-24 w-24 rounded-2xl bg-linear-to-br from-slate-900 to-slate-700 p-4 shadow-xl">
                    <div className="text-xs text-white/80">Tasks</div>
                    <div className="text-2xl font-bold text-white">87%</div>
                </div>
                <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-2xl bg-white p-4 shadow-xl">
                    <div className="text-xs text-slate-500">Manage</div>
                    <div className="text-2xl font-bold text-slate-900">Tasks</div>
                </div>
            </div>
        </div>
    )
})

export default HeroRightSection
