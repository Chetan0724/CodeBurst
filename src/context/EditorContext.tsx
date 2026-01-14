"use client";
import { createContext, Dispatch, SetStateAction } from "react";

interface IEditor {
  language: string;
  setLanguage: Dispatch<SetStateAction<string>>;
  currTaskId: number;
  setCurrTaskId: Dispatch<SetStateAction<number>>;
}

const EditorContext = createContext<IEditor | null>(null);

export default EditorContext;
