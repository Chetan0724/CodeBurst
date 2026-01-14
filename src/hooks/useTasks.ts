import { useInfiniteQuery } from "@tanstack/react-query";

interface Task {
  id: string;
  taskId: number;
  topic: string;
  description: string;
  language: string;
  difficulty: string;
  expectedOutput: string;
}

interface TasksResponse {
  tasks: Task[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export function useTasks(language: string) {
  return useInfiniteQuery<TasksResponse>({
    queryKey: ["tasks", language],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(
        `/api/tasks/${language}?page=${pageParam}&limit=10`
      );
      if (!res.ok) throw new Error("Failed to fetch tasks");
      return res.json();
    },
    getNextPageParam: (lastPage) =>
      lastPage.pagination.hasMore ? lastPage.pagination.page + 1 : undefined,
    initialPageParam: 1,
    enabled: !!language,
  });
}
