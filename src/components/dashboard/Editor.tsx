"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";
import { useEffect } from "react";

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
    main()"`,
};

export const languageIds: Record<string, number> = {
  cpp: 54,
  javascript: 63,
  python: 71,
};

const EditorPage = () => {
  const [input, setInput] = useState("");

  const { language } = useContext(EditorContext)!;

  useEffect(() => {
    setInput(boilerplates[language]);
  }, [language]);

  const handleSubmit = async () => {
    const submitResponse = await fetch("/api/judge0/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: languageIds[language],
        source_code: input,
      }),
    });

    const { token } = await submitResponse.json();

    const statusResponse = await fetch(`/api/judge0/status/${token}`);
    const data = await statusResponse.json();
    console.log(data);
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
        ></Editor>
      </CardContent>
      <CardFooter>
        <Button
          className="bg-green-600 text-white hover:text-black"
          onClick={handleSubmit}
        >
          Run Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditorPage;
