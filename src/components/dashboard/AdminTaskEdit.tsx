"use client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";

interface Task {
  id: string;
  taskId: number;
  topic: string;
  description: string;
  language: string;
  difficulty: string;
  expectedOutput: string;
}

const fetchTaskById = async (id: string) => {
  const res = await fetch(`/api/read-tasks?id=${id}`);
  if (!res.ok) throw new Error("Failed to fetch task");
  return res.json();
};

const updateTask = async (task: Task) => {
  const res = await fetch(`/api/edit-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  if (!res.ok) throw new Error("Failed to update task");
  return await res.json();
};

const AdminTaskEdit = ({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose: () => void;
}) => {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery<Task>({
    queryKey: ["task", taskId],
    queryFn: () => fetchTaskById(taskId),
  });
  const [form, setForm] = useState<Task | null>(null);

  const mutation = useMutation({
    mutationFn: updateTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks"] });
      onClose();
    }
  });

  if (isLoading || !data) return <div>Loading task...</div>;

  if (form === null && data) {
    setForm(data);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!form) return;
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Card className="fixed left-1/2 top-24 -translate-x-1/2 w-full max-w-md bg-background z-50 shadow-xl border border-border">
      <CardHeader>
        <CardTitle>Edit Task</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          name="topic"
          value={form?.topic ?? ""}
          onChange={handleChange}
          placeholder="Topic"
          className="mb-2"
        />
        <Textarea
          name="description"
          value={form?.description ?? ""}
          onChange={handleChange}
          placeholder="Description"
          className="mb-2"
        />
        <Input
          name="expectedOutput"
          value={form?.expectedOutput ?? ""}
          onChange={handleChange}
          placeholder="Expected Output"
          className="mb-2"
        />
        <Select
          value={form?.difficulty ?? ""}
          onValueChange={(val) =>
            setForm((f) => (f ? { ...f, difficulty: val } : f))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Easy">Easy</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Hard">Hard</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select
          value={form?.language ?? ""}
          onValueChange={(val) =>
            setForm((f) => (f ? { ...f, language: val } : f))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
              <SelectItem value="go">Go</SelectItem>
              <SelectItem value="rust">Rust</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={() => form && mutation.mutate(form)}
            variant="default"
            disabled={!form || mutation.isPending}
          >
            {mutation.isPending ? "Saving..." : "Save"}
          </Button>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminTaskEdit;
