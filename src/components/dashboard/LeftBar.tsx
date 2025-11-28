"use client";
import LanguageDropdown from "./LanguageDropdown";
import TaskCard from "./TaskCard";
import { useContext } from "react";
import EditorContext from "@/context/EditorContext";
import SidebarContext from "@/context/SidebarContext";

const LeftBar = () => {
  const { tasks, setCurrTaskId } = useContext(EditorContext)!;
  const { isSidebarOpen } = useContext(SidebarContext)!;

  return (
    <aside
      className={`bg-primarytwo  text-black dark:text-white border-r fixed left-0 top-[3.25rem] bottom-0 flex flex-col z-50 w-dvw sm:w-2xs transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} `}
    >
      <div className="border-b shrink-0 p-3">
        <LanguageDropdown />
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto p-3">
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
