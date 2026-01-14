"use client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Task {
  id: string;
  taskId: number;
  topic: string;
  description: string;
  language: string;
  difficulty: string;
  expectedOutput: string;
}

const fetchTasks = async () => {
  const res = await fetch("/api/read-tasks");
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return await res.json();
};

const deleteTask = async (id: string) => {
  const res = await fetch("/api/delete-task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Failed to delete task");
  }
  return res.json();
};

const AdminTaskList = () => {
  const [editTaskId, setEditTaskId] = useState<string | null>(null);
  const [languageFilter, setLanguageFilter] = useState<string>("all");
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery<Task[]>({
    queryKey: ["all-tasks"],
    queryFn: fetchTasks,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      toast.success("Task deleted");
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
    },
    onError: (error: Error) => {
      toast.error(error?.message || "Failed to delete task");
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4 mt-8">
        <Skeleton className="h-6 w-40 mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="bg-card/70 border border-border">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
              </CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-8 w-24" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError || !data || !Array.isArray(data)) {
    return (
      <div className="mt-8 text-sm text-red-500 text-center">
        Failed to load tasks.
      </div>
    );
  }

  const filteredTasks =
    languageFilter === "all"
      ? data
      : data.filter((task) => task.language === languageFilter);

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    deleteMutation.mutate(id);
  };

  return (
    <div className="space-y-6 mt-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-bold text-xl">All Tasks</h2>
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">Filter by language:</span>
          <Select
            value={languageFilter}
            onValueChange={(val) => setLanguageFilter(val)}
          >
            <SelectTrigger className="h-8 w-40 text-xs">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
                <SelectItem value="python">Python</SelectItem>
                <SelectItem value="cpp">C++</SelectItem>
                <SelectItem value="java">Java</SelectItem>
                <SelectItem value="go">Go</SelectItem>
                <SelectItem value="rust">Rust</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <Card key={task.id} className="bg-card/70 border border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-semibold">
                {`[${task.language}] #${task.taskId}: ${task.topic}`}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-xs text-gray-400">
                Difficulty: {task.difficulty}
              </div>
              <div className="text-sm line-clamp-2">{task.description}</div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditTaskId(task.id)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  disabled={deleteMutation.isPending}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {editTaskId && (
        <AdminTaskEdit taskId={editTaskId} onClose={() => setEditTaskId(null)} />
      )}
    </div>
  );
};

const AdminTaskEdit = dynamic(() => import("./AdminTaskEdit"), { ssr: false });

export default AdminTaskList;
