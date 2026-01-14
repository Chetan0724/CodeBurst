"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";

import {
  TaskFormSchema,
  type TTaskFormInput,
} from "@/lib/zod_schemas/task.zod";

import { authClient, type ExtendedUser } from "@/lib/auth-client";
import AdminTaskList from "@/components/dashboard/AdminTaskList";
import AdminUsersSection from "@/components/AdminUsersSection";

const Admin = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [activeTab, setActiveTab] = useState<"tasks" | "users">("tasks");

  useEffect(() => {
    if (
      !isPending &&
      (!session || (session.user as ExtendedUser).role !== "admin")
    ) {
      toast.error("Unauthorized access");
      router.replace("/dashboard");
    }
  }, [session, isPending, router]);

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTaskFormInput>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      topic: "",
      taskId: "",
      language: undefined,
      difficulty: undefined,
      description: "",
      expectedAnswer: "",
    },
  });

  const taskHandler: SubmitHandler<TTaskFormInput> = async (data) => {
    const payload = {
      ...data,
      taskId: Number(data.taskId),
    };

    await fetch("/api/add-task", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    reset();
  };

  useEffect(() => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) toast.error(String(firstError.message));
  }, [errors]);

  if (isPending) {
    return (
      <div className="max-w-7xl mx-auto p-8">
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (!session || (session.user as ExtendedUser).role !== "admin") {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Admin Console</h1>
        <div className="flex gap-2">
          <Button
            variant={activeTab === "tasks" ? "default" : "outline"}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks
          </Button>
          <Button
            variant={activeTab === "users" ? "default" : "outline"}
            onClick={() => setActiveTab("users")}
          >
            Users
          </Button>
        </div>
      </div>

      {activeTab === "tasks" && (
        <>
          <form
            onSubmit={handleSubmit(taskHandler)}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-primarytwo p-8 rounded-xl border"
          >
            <div>
              <Label>Topic</Label>
              <Input {...register("topic")} />
            </div>

            <div>
              <Label>Task ID</Label>
              <Input {...register("taskId")} />
            </div>

            <div>
              <Label>Language</Label>
              <Controller
                name="language"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                        <SelectItem value="cpp">C++</SelectItem>
                        <SelectItem value="java">Java</SelectItem>
                        <SelectItem value="go">Go</SelectItem>
                        <SelectItem value="rust">Rust</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div>
              <Label>Difficulty</Label>
              <Controller
                name="difficulty"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="Easy">Easy</SelectItem>
                        <SelectItem value="Medium">Medium</SelectItem>
                        <SelectItem value="Hard">Hard</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="md:col-span-2">
              <Label>Description</Label>
              <Textarea {...register("description")} />
            </div>

            <div className="md:col-span-2">
              <Label>Expected Answer</Label>
              <Input {...register("expectedAnswer")} />
            </div>

            <div className="md:col-span-2 flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>

          <AdminTaskList />
        </>
      )}

      {activeTab === "users" && <AdminUsersSection />}
    </div>
  );
};

export default Admin;
