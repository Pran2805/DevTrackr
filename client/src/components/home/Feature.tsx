import {
    BarChart3,
    Users,
    Clock,
    Shield,
    Zap,
    Target
} from "lucide-react";
import { memo } from "react";

const features = [
    {
        icon: BarChart3,
        title: "Analytics Dashboard",
        description: "Real-time insights into project performance, team velocity, and resource allocation."
    },
    {
        icon: Users,
        title: "Team Collaboration",
        description: "Seamless communication with built-in chat, comments, and file sharing."
    },
    {
        icon: Clock,
        title: "Time Tracking",
        description: "Automated time tracking and detailed reports for better productivity."
    },
    {
        icon: Shield,
        title: "Enterprise Security",
        description: "Bank-level encryption and role-based access control for your data."
    },
    {
        icon: Zap,
        title: "Automation",
        description: "Streamline workflows with custom triggers and automated actions."
    },
    {
        icon: Target,
        title: "Goal Setting",
        description: "Set, track, and achieve project milestones with OKR integration."
    }
];

const FeaturesSection = memo(() => {
    return (
        <section className="relative bg-slate-50 py-20">
            <div className="absolute inset-0 -z-10 bg-[radial-linear(#e2e8f0_1px,transparent_1px)] bg-size-[16px_16px]" />

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/50 px-4 py-1.5 text-sm backdrop-blur-sm">
                        <span className="text-slate-600">🚀 Powerful Features</span>
                    </div>
                    <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
                        Everything you need to manage projects effectively
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Streamline your workflow with our comprehensive suite of project management tools
                    </p>
                </div>

                {/* Features grid */}
                <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div
                                key={index}
                                className="group relative rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:border-slate-300 hover:shadow-lg"
                            >
                                {/* Icon */}
                                <div className="mb-5 inline-flex rounded-xl bg-linear-to-br from-slate-900 to-slate-700 p-3 text-white shadow-lg">
                                    <Icon className="size-6" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-semibold text-slate-900">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-slate-600">
                                    {feature.description}
                                </p>

                                {/* Hover effect */}
                                <div className="absolute inset-0 rounded-2xl bg-linear-to-r from-slate-900/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                            </div>
                        );
                    })}
                </div>

                {/* Stats */}
                <div className="mt-20 grid grid-cols-2 gap-8 rounded-2xl bg-linear-to-r from-slate-900 to-slate-800 p-8 text-white md:grid-cols-4">
                    {[
                        { value: "10k+", label: "Active Users" },
                        { value: "98%", label: "Satisfaction" },
                        { value: "500+", label: "Integrations" },
                        { value: "24/7", label: "Support" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold">{stat.value}</div>
                            <div className="mt-1 text-sm text-slate-300">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
)
export default FeaturesSection;