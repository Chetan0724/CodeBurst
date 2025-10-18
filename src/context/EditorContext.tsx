"use client";
import { createContext, Dispatch, SetStateAction } from "react";

export interface Task {
  taskId: number;
  language: string;
  difficulty: string;
  topic: string;
  description: string;
  expectedOutput: string;
}

interface IEditor {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  currTaskId: number;
  setCurrTaskId: Dispatch<SetStateAction<number>>;
  tasks: Task[];
  setTasks: Dispatch<SetStateAction<Task[]>>;
}

const EditorContext = createContext<IEditor | null>(null);

export default EditorContext;
