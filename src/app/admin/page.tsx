"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { auth } from "@/lib/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  TaskFormSchema,
  type TTaskFormSchema,
} from "@/lib/zod_schemas/task.zod";
import { toast } from "sonner";
import { useEffect } from "react";

const Admin = () => {
  // const session = await auth.api.getSession({
  //   headers: await headers(),
  // });

  // if (!session) {
  //   redirect("/signin");
  // }

  const {
    register,
    reset,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTaskFormSchema>({
    resolver: zodResolver(TaskFormSchema),
  });

  const taskHandler = (data: TTaskFormSchema) => {
    console.log(data);
    toast.success("Task created successfully!");
    reset();
  };

  useEffect(() => {
    const firstError = Object.values(errors)[0];
    if (firstError?.message) {
      toast.error(firstError.message);
    }
  }, [errors]);

  return (
    <div className="mt-36 flex justify-center px-4 sm:px-6">
      <div className="w-full max-w-2xl bg-primarytwo shadow-md rounded-2xl p-6 sm:p-8 border border-border">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6  sm:mb-8">
          Admin Panel
        </h3>
        <form
          className="flex flex-col gap-6"
          onSubmit={handleSubmit(taskHandler)}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="topic">Topic</Label>
            <Input
              {...register("topic")}
              id="topic"
              name="topic"
              placeholder="Enter topic name"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="taskId">TaskID</Label>
            <Input
              {...register("taskId")}
              id="taskId"
              name="taskId"
              placeholder="Enter task ID"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Language</Label>
            <Controller
              name="language"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="javascript">JavaScript</SelectItem>
                      <SelectItem value="python">Python</SelectItem>
                      <SelectItem value="cpp">C++</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="flex flex-col gap-2">
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

          <div className="flex flex-col gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              {...register("description")}
              placeholder="Type your task description here..."
              id="description"
              name="description"
              className="min-h-[100px]"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="expectedAnswer">Expected Answer</Label>
            <Input
              {...register("expectedAnswer")}
              id="expectedAnswer"
              placeholder="Enter expected output"
            />
          </div>

          <Button disabled={isSubmitting} className="mt-2" type="submit">
            {isSubmitting ? "Creating Task" : "Create Task"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Admin;
