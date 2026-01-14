"use client";
import LanguageDropdown from "./LanguageDropdown";
import TaskCard from "./TaskCard";
import { useContext, useEffect, useRef } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import EditorContext from "@/context/EditorContext";
import SidebarContext from "@/context/SidebarContext";
import { useTasks } from "@/hooks/useTasks";
import { useProgress } from "@/hooks/useProgress";

const LeftBar = () => {
  const { language, setCurrTaskId } = useContext(EditorContext)!;
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext)!;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useTasks(language);
  const { data: progressData } = useProgress(language);

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const allTasks = data?.pages.flatMap((page) => page.tasks) || [];
  const solvedTaskIds = new Set(
    progressData?.solvedTasks.map((st) => st.taskId) || []
  );

  return (
    <aside
      className={`bg-primarytwo text-black dark:text-white border-r fixed left-0 top-0 bottom-0 flex flex-col z-50 w-dvw sm:w-72 transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >
      <div className="border-b shrink-0 p-3 flex gap-2 items-center justify-between">
        <LanguageDropdown />
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="cursor-pointer bg-black text-white dark:bg-white dark:text-black rounded-full w-5 h-5 flex items-center justify-center"
        >
          <IconChevronLeft stroke={2} />
        </button>
      </div>
      <div className="space-y-2 flex-1 overflow-y-auto p-3 scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-black scrollbar-track-transparent dark:scrollbar-thumb-white">
        {isLoading ? (
          <p className="text-center text-sm text-neutral-500">Loading...</p>
        ) : (
          <>
            {allTasks.map(({ taskId, difficulty, topic }) => (
              <div
                key={`${taskId}-${language}`}
                onClick={() => {
                  setCurrTaskId(taskId);
                  setIsSidebarOpen(!isSidebarOpen);
                }}
                className="cursor-pointer"
              >
                <TaskCard
                  taskId={taskId}
                  difficulty={difficulty}
                  topic={topic}
                  isSolved={solvedTaskIds.has(taskId)}
                />
              </div>
            ))}
            <div ref={observerTarget} className="h-4">
              {isFetchingNextPage && (
                <p className="text-center text-sm text-neutral-500">
                  Loading more...
                </p>
              )}
            </div>
          </>
        )}
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 sm:hidden z-60"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </aside>
  );
};

export default LeftBar;
