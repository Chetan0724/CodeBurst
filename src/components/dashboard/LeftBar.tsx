"use client";
import LanguageDropdown from "./LanguageDropdown";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";

const LeftBar = () => {
  const { tasks, setCurrTaskId } = useContext(EditorContext)!;

  return (
    <aside className="bg-primarytwo text-white border-r fixed left-0 top-[3.25rem] bottom-0 flex flex-col p-3">
      <div className="border-b shrink-0">
        <LanguageDropdown />
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto">
        {tasks!.map(({ taskId, difficulty, topic, language }) => (
          <div
            key={taskId + language}
            onClick={() => setCurrTaskId(taskId)}
            className="cursor-pointer"
          >
            <TaskCard taskId={taskId} difficulty={difficulty} topic={topic} />
          </div>
        ))}
      </div>
    </aside>
  );
};

export default LeftBar;
