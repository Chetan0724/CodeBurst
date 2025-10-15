"use client";
import { createContext } from "react";
import { Dispatch, SetStateAction } from "react";

interface IEditor {
  language: string | undefined;
  setLanguage: Dispatch<SetStateAction<undefined | string>>;
  task: number | undefined;
  setTask: Dispatch<SetStateAction<undefined | number>>;
}

const EditorContext = createContext<IEditor | null>(null);

export default EditorContext;
