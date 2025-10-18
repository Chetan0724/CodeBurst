"use client";
import EditorContext, { Task } from "./EditorContext";
import { ReactNode, useState } from "react";
import { tasksArray } from "@/lib/tasksData";

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [currTaskId, setCurrTaskId] = useState<number>(1);
  const langArr = tasksArray.filter((task) => task.language === language);
  const [tasks, setTasks] = useState<Task[]>(langArr);

  return (
    <EditorContext.Provider
      value={{
        language,
        setLanguage,
        currTaskId,
        setCurrTaskId,
        tasks,
        setTasks,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
