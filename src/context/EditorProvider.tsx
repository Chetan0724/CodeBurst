"use client";
import EditorContext from "./EditorContext";
import { ReactNode, useState } from "react";

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string | undefined>();
  const [task, setTask] = useState<number | undefined>(1);

  return (
    <EditorContext.Provider value={{ language, setLanguage, task, setTask }}>
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
