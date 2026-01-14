import { useQuery } from "@tanstack/react-query";

interface SolvedTask {
  taskId: number;
  language: string;
  solvedAt: string;
}

interface LanguageStat {
  language: string;
  total: number;
  solved: number;
}

interface ProgressData {
  solvedTasks: SolvedTask[];
  languageStats: LanguageStat[];
  totalSolved: number;
}

export function useProgress(language?: string) {
  return useQuery<ProgressData>({
    queryKey: ["progress", language],
    queryFn: async () => {
      const url = language
        ? `/api/progress?language=${language}`
        : "/api/progress";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch progress");
      return res.json();
    },
  });
}
