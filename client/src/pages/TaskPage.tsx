import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Search, Filter } from "lucide-react";
import { useState } from "react";

export default function TaskPage() {
    const [tasks] = useState([
        { id: 1, title: "Design Review", status: "pending", priority: "high", dueDate: "2024-03-25" },
        { id: 2, title: "Update Documentation", status: "in-progress", priority: "medium", dueDate: "2024-03-26" },
        { id: 3, title: "Fix Navigation Bug", status: "completed", priority: "high", dueDate: "2024-03-23" },
        { id: 4, title: "Team Meeting", status: "pending", priority: "low", dueDate: "2024-03-27" },
    ]);

    const getPriorityColor = (priority: string) => {
        switch(priority) {
            case "high": return "bg-red-500";
            case "medium": return "bg-yellow-500";
            case "low": return "bg-green-500";
            default: return "bg-gray-500";
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">My Tasks</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage and track your personal tasks
                    </p>
                </div>
                <Button className="gap-2">
                    <PlusCircle className="size-4" />
                    New Task
                </Button>
            </div>

            <div className="flex gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-muted-foreground" />
                    <Input placeholder="Search tasks..." className="pl-9" />
                </div>
                <Button variant="outline" size="icon">
                    <Filter className="size-4" />
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <Checkbox id={`task-${task.id}`} />
                                    <div>
                                        <label 
                                            htmlFor={`task-${task.id}`}
                                            className={`text-sm font-medium ${task.status === 'completed' ? 'line-through text-muted-foreground' : ''}`}
                                        >
                                            {task.title}
                                        </label>
                                        <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                                    </div>
                                </div>
                                <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                                    {task.priority}
                                </Badge>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}