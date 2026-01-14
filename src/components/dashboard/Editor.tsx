"use client";
import Editor from "@monaco-editor/react";
import { useState, useContext, useEffect, useMemo } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import EditorContext from "@/context/EditorContext";
import { useTasks } from "@/hooks/useTasks";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

const boilerplates: Record<string, string> = {
  cpp: `#include <bits/stdc++.h>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`,
  javascript: `// Write your code here
function main() {
  console.log("Hello, World!");
}
main();`,
  python: `def main():
    # Write your code here
    print("Hello, World!")

if __name__ == "__main__":
    main()`,

  java: `public class Main {
    public static void main(String[] args) {
        // Write your code here
        System.out.println("Hello, World!");
    }
}`,

  go: `package main
import "fmt"

func main() {
    // Write your code here
    fmt.Println("Hello, World!")
}`,

  rust: `fn main() {
    // Write your code here
    println!("Hello, World!");
}`,
};

export const languageIds: Record<string, number> = {
  cpp: 54,
  javascript: 63,
  python: 71,
  java: 62,
  go: 95,
  rust: 73,
};

interface EditorPageProps {
  onOutputChange: (output: string, status: string) => void;
}

const EditorPage = ({ onOutputChange }: EditorPageProps) => {
  const [input, setInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language, currTaskId } = useContext(EditorContext)!;
  const { data } = useTasks(language);
  const queryClient = useQueryClient();

  const allTasks = useMemo(
    () => data?.pages.flatMap((page) => page.tasks) || [],
    [data]
  );

  const currTask = allTasks.find((task) => task.taskId === currTaskId);

  useEffect(() => {
    setInput(boilerplates[language]);
  }, [language]);

  const handleSubmit = async () => {
    if (!currTask) {
      toast.error("No task selected");
      return;
    }

    setIsSubmitting(true);
    onOutputChange("", "running");

    try {
      const submitResponse = await fetch("/api/judge0/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language_id: languageIds[language],
          source_code: input,
        }),
      });

      const { token } = await submitResponse.json();

      let attempts = 0;
      const maxAttempts = 10;

      const checkStatus = async (): Promise<void> => {
        const statusResponse = await fetch(`/api/judge0/status/${token}`);
        const data = await statusResponse.json();

        if (data.data.status.id <= 2 && attempts < maxAttempts) {
          attempts++;
          await new Promise((resolve) => setTimeout(resolve, 1000));
          return checkStatus();
        }

        const output =
          data.data.stdout ||
          data.data.stderr ||
          data.data.compile_output ||
          "No output";
        const status = data.data.status.description;

        if (data.data.status.id === 3) {
          const solutionResponse = await fetch("/api/submit-solution", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              taskId: currTaskId,
              language,
              output: data.data.stdout?.trim(),
              expectedOutput: currTask.expectedOutput,
            }),
          });

          const result = await solutionResponse.json();

          if (result.isCorrect) {
            toast.success(result.message);
            queryClient.invalidateQueries({ queryKey: ["progress"] });
            onOutputChange(output, "Accepted");
          } else {
            toast.error(result.message);
            onOutputChange(output, "Wrong Answer");
          }
        } else {
          onOutputChange(output, status);
          toast.error(`Execution failed: ${status}`);
        }
      };

      await checkStatus();
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit code");
      onOutputChange("Error occurred during submission", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card>
      <CardContent>
        <Editor
          onChange={(value) => {
            setInput(value || "");
          }}
          value={input}
          height="40vh"
          theme="vs-dark"
          language={language}
          options={{ minimap: { enabled: false } }}
        />
      </CardContent>
      <CardFooter>
        <Button
          className="dark:text-black dark:bg-white"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Running..." : "Run Code"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditorPage;
