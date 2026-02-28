import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, Award, Filter } from "lucide-react";
import { useState } from "react";

export default function AchievedPage() {
    const [achievements] = useState([
        { id: 1, title: "Completed 50 Tasks", date: "2024-03-15", type: "milestone", icon: "🏆" },
        { id: 2, title: "Team Collaboration", date: "2024-03-10", type: "badge", icon: "🤝" },
        { id: 3, title: "Early Adopter", date: "2024-03-05", type: "achievement", icon: "⭐" },
        { id: 4, title: "Project Lead", date: "2024-02-28", type: "role", icon: "👑" },
        { id: 5, title: "100% Task Completion", date: "2024-02-20", type: "milestone", icon: "🎯" },
        { id: 6, title: "Bug Hunter", date: "2024-02-15", type: "badge", icon: "🐛" },
    ]);

    const completedTasks = [
        { id: 1, title: "Design System Update", completedDate: "2024-03-20", project: "UI/UX" },
        { id: 2, title: "API Integration", completedDate: "2024-03-19", project: "Backend" },
        { id: 3, title: "User Testing", completedDate: "2024-03-18", project: "QA" },
        { id: 4, title: "Documentation", completedDate: "2024-03-17", project: "DevOps" },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Achievements</h1>
                    <p className="text-muted-foreground mt-1">
                        Track your milestones and completed tasks
                    </p>
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="size-4" />
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-linear-to-br from-yellow-500 to-yellow-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Achievements</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{achievements.length}</div>
                        <p className="text-xs opacity-90 mt-1">+2 this month</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">156</div>
                        <p className="text-xs opacity-90 mt-1">This month: 24</p>
                    </CardContent>
                </Card>
                
                <Card className="bg-linear-to-br from-purple-500 to-purple-600 text-white">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Current Streak</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">12 days</div>
                        <p className="text-xs opacity-90 mt-1">Best: 30 days</p>
                    </CardContent>
                </Card>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="size-5" />
                    Badges & Achievements
                </h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {achievements.map((achievement) => (
                        <Card key={achievement.id} className="hover:shadow-lg transition-shadow">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-4xl">{achievement.icon}</div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{achievement.title}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Calendar className="size-3 text-muted-foreground" />
                                            <p className="text-xs text-muted-foreground">
                                                Earned on {new Date(achievement.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <Badge variant="secondary" className="mt-2">
                                            {achievement.type}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Award className="size-5" />
                    Recently Completed Tasks
                </h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="divide-y">
                            {completedTasks.map((task) => (
                                <div key={task.id} className="flex items-center justify-between p-4 hover:bg-muted/50">
                                    <div>
                                        <p className="font-medium">{task.title}</p>
                                        <p className="text-sm text-muted-foreground">Project: {task.project}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm">{new Date(task.completedDate).toLocaleDateString()}</p>
                                        <Badge variant="outline" className="mt-1">Completed</Badge>
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