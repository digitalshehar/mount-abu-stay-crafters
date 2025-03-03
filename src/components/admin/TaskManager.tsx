
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, Plus, Trash } from "lucide-react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, text: "Update homepage content", completed: false },
    { id: 2, text: "Add new hotel listings", completed: false },
    { id: 3, text: "Respond to customer inquiries", completed: true },
    { id: 4, text: "Review website analytics", completed: false },
    { id: 5, text: "Update pricing for summer season", completed: false },
  ]);
  const [newTaskText, setNewTaskText] = useState("");

  const addTask = () => {
    if (newTaskText.trim() === "") return;
    
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText("");
  };

  const toggleTaskCompletion = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const progress = tasks.length > 0 ? (completedTasks / tasks.length) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>My Tasks</span>
          <span className="text-sm font-normal text-muted-foreground">
            {completedTasks} of {tasks.length} completed
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-muted rounded-full h-2 mb-4">
          <div
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="mb-4 flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={addTask}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2 max-h-[240px] overflow-y-auto">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center justify-between py-2 px-3 rounded-md border ${
                task.completed ? "bg-muted/50" : ""
              }`}
            >
              <div className="flex items-center">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mr-2 focus:outline-none"
                >
                  {task.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-muted-foreground" />
                  )}
                </button>
                <span
                  className={`text-sm ${
                    task.completed ? "line-through text-muted-foreground" : ""
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => removeTask(task.id)}
              >
                <Trash className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          ))}
          
          {tasks.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              No tasks yet. Add some tasks to get started.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskManager;
