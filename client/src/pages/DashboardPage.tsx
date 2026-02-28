import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, CheckCircle, Clock, ListTodo, Users } from "lucide-react";

export default function DashboardPage() {
    const stats = [
        {
            title: "Total Tasks",
            value: "24",
            icon: ListTodo,
            change: "+12%",
            color: "bg-blue-500"
        },
        {
            title: "Completed",
            value: "18",
            icon: CheckCircle,
            change: "+8%",
            color: "bg-green-500"
        },
        {
            title: "In Progress",
            value: "6",
            icon: Clock,
            change: "-2%",
            color: "bg-yellow-500"
        },
        {
            title: "Team Members",
            value: "8",
            icon: Users,
            change: "+2",
            color: "bg-purple-500"
        }
    ];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground mt-1">
                    Welcome back! Here's what's happening with your projects.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <Card key={index}>
                            <CardHeader className="flex flex-row items-center justify-between pb-2">
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {stat.title}
                                </CardTitle>
                                <div className={`p-2 rounded-lg ${stat.color} bg-opacity-10`}>
                                    <Icon className={`h-4 w-4 ${stat.color} text-white`} />
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stat.value}</div>
                                <p className="text-xs text-muted-foreground mt-1">
                                    <span className="text-green-600">{stat.change}</span> from last month
                                </p>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="h-50 flex items-center justify-center border-2 border-dashed rounded-lg">
                            <div className="text-center">
                                <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="text-sm text-muted-foreground">Chart Component Here</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <div className="flex-1">
                                        <p className="text-sm font-medium">Task {i} was completed</p>
                                        <p className="text-xs text-muted-foreground">2 hours ago</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}