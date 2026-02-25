import { lazy, Suspense } from "react";
import LoadingPage from "./LoadingPage";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const HeroSection = lazy(() => import("@/components/home/HeroSection"));
const FeaturesSection = lazy(() => import("@/components/home/Feature"));

export default function LandingPage() {
  return (
    <div className="min-h-screen">

      <Navbar />
      <div>
        <Suspense fallback={<LoadingPage />}>
          <HeroSection />
          <FeaturesSection />
        </Suspense>
      </div>
      <Footer />
    </div>
  )
}
