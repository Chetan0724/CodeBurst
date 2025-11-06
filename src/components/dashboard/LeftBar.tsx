"use client";
import LanguageDropdown from "./LanguageDropdown";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";

const LeftBar = () => {
  const { tasks, setCurrTaskId } = useContext(EditorContext)!;

  return (
    <div className="bg-primarytwo p-3 text-white top-36 border space-y-2.5 rounded-2xl">
      <LanguageDropdown />
      <hr />
      <div className="space-y-2 overflow-y-auto h-[calc(100vh-15rem)]">
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
    </div>
  );
};

export default LeftBar;
