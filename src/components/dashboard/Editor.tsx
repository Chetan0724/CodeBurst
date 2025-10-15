"use client";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "../ui/button";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";

const EditorPage = () => {
  const [input, setInput] = useState("");

  const boilerplates = {
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

  const { language } = useContext(EditorContext)!;

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
          defaultValue={boilerplates.javascript}
          options={{ minimap: { enabled: false } }}
        ></Editor>
      </CardContent>
      <CardFooter>
        <Button className="bg-green-600 text-white hover:text-black">
          Run Code
        </Button>
      </CardFooter>
    </Card>
  );
};

export default EditorPage;
