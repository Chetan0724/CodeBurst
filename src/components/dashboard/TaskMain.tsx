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
import { useContext, useState } from "react";
import EditorContext from "@/context/EditorContext";

const TaskMain = () => {
  const [ansToggle, setAnsToggle] = useState(false);
  const { currTaskId, tasks, setCurrTaskId, language } =
    useContext(EditorContext)!;

  const currTaskMain = tasks.filter((task) => task.taskId == currTaskId);
  const maxLengthArray = tasks.filter((task) => task.language == language);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{`Task#${currTaskId}`}</CardTitle>
          <CardDescription>{currTaskMain[0].topic}</CardDescription>
          <CardAction className="space-x-2">
            <Button
              variant="secondary"
              disabled={currTaskId == 1}
              onClick={() => setCurrTaskId(currTaskId - 1)}
            >
              <ChevronLeft />
            </Button>
            <Button
              variant="secondary"
              disabled={currTaskId == maxLengthArray.length}
              onClick={() => setCurrTaskId(currTaskId + 1)}
            >
              <ChevronRight />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div>
            <p>{currTaskMain[0].description}</p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start gap-3">
          <Button variant="outline" onClick={() => setAnsToggle(!ansToggle)}>
            {ansToggle ? "Hide Answer" : "Show Answer"}
          </Button>
          {ansToggle && (
            <div className="bg-[#1d2722] border border-green-900 rounded-lg p-4">
              <p className="text-green-600 font-medium mb-2">Answer</p>
              <div className="bg-[#1c3326] border border-green-800 rounded-md p-3">
                <pre>
                  <code>{currTaskMain[0].expectedOutput}</code>
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
