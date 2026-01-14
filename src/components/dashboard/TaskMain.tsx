"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContext, useState, useMemo } from "react";
import EditorContext from "@/context/EditorContext";
import { useTasks } from "@/hooks/useTasks";

const TaskMain = () => {
  const [ansToggle, setAnsToggle] = useState(false);
  const { currTaskId, language, setCurrTaskId } = useContext(EditorContext)!;
  const { data, isLoading } = useTasks(language);

  const allTasks = useMemo(
    () => data?.pages.flatMap((page) => page.tasks) || [],
    [data]
  );

  const currTask = allTasks.find((task) => task.taskId === currTaskId);
  const maxTaskId = Math.max(...allTasks.map((t) => t.taskId), 1);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p>Loading task...</p>
        </CardContent>
      </Card>
    );
  }

  if (!currTask) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p>Task not found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{`Task#${currTaskId}`}</CardTitle>
          <CardDescription>{currTask.topic}</CardDescription>
          <CardAction className="space-x-2">
            <Button
              variant="secondary"
              disabled={currTaskId === 1}
              onClick={() => setCurrTaskId(currTaskId - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              disabled={currTaskId === maxTaskId}
              onClick={() => setCurrTaskId(currTaskId + 1)}
            >
              <ChevronRight />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <p>{currTask.description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3">
          <Button variant="outline" onClick={() => setAnsToggle(!ansToggle)}>
            {ansToggle ? "Hide Answer" : "Show Answer"}
          </Button>
          {ansToggle && (
            <div className="bg-[#1d2722] border border-green-900 rounded-lg p-4 w-full">
              <p className="text-green-600 font-medium mb-2">Answer</p>
              <div className="bg-[#1c3326] border border-green-800 rounded-md p-3">
                <pre>
                  <code>{currTask.expectedOutput}</code>
                </pre>
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default TaskMain;
