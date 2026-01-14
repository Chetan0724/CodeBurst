"use client";
import EditorContext from "./EditorContext";
import { ReactNode, useState } from "react";

const EditorProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<string>("javascript");
  const [currTaskId, setCurrTaskId] = useState<number>(1);

  return (
    <EditorContext.Provider
      value={{
        language,
        setLanguage,
        currTaskId,
        setCurrTaskId,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export default EditorProvider;
