"use client";
import { useState } from "react";
import EditorPage from "@/components/dashboard/Editor";
import TaskMain from "@/components/dashboard/TaskMain";
import Console from "@/components/dashboard/Console";
import SidebarLayout from "@/components/dashboard/SidebarLayout";

const Dashboard = () => {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");

  const handleOutputChange = (newOutput: string, newStatus: string) => {
    setOutput(newOutput);
    setStatus(newStatus);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Dashboard
          </p>
          <h1 className="text-2xl font-semibold">Practice Workspace</h1>
        </div>
      </div>
      <SidebarLayout>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-300 ease-in-out">
          <div className="lg:col-span-3">
            <TaskMain />
          </div>
          <div className="lg:col-span-2">
            <EditorPage onOutputChange={handleOutputChange} />
          </div>
          <div>
            <Console output={output} status={status} />
          </div>
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Dashboard;
