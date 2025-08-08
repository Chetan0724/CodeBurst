"use client";
import Editor from "@monaco-editor/react";

const EditorPage = () => {
  return (
    <Editor
      height="40vh"
      theme="vs-dark"
      language="javascript"
      defaultValue=""
      options={{ minimap: { enabled: false } }}
    ></Editor>
  );
};

export default EditorPage;
