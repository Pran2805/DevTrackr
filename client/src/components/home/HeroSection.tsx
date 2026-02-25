
import { Loader2 } from "lucide-react";
import React, { memo, Suspense } from "react";

const HeroLeftSection = React.lazy(() => import("./HeroLeftSection"));
const HeroRightSection = React.lazy(() => import("./HeroRightSection"));

const HeroSection = memo(() => {
    return (
        <main className="relative  overflow-hidden bg-slate-100 px-10">
            <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center px-4 md:flex-row md:px-6 lg:px-8">
                <Suspense fallback={
                    <div className="flex h-full justify-center items-center">
                        <Loader2 className="animate-spin" />
                    </div>
                }>
                    <HeroLeftSection />
                </Suspense>
                <Suspense fallback={
                    <div className="flex h-full justify-center items-center">
                        <Loader2 className="animate-spin" />
                    </div>
                }>
                    <HeroRightSection />
                </Suspense>
            </div>
        </main>
    );
})
export default HeroSection;