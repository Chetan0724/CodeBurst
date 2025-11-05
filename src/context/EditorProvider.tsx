"use client";
import EditorContext, { Task } from "./EditorContext";
import { ReactNode, useState } from "react";
import { tasksData } from "@/lib/api";

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [currTaskId, setCurrTaskId] = useState<number>(1);
  const [allTasks, setAllTasks] = useState<Task[]>(tasksData);
  const [tasks, setTasks] = useState<Task[]>(
    allTasks.filter((task) => task.language == "javascript")
  );

  return (
    <EditorContext.Provider
      value={{
        language,
        setLanguage,
        currTaskId,
        setCurrTaskId,
        tasks,
        setTasks,
        allTasks,
        setAllTasks,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
