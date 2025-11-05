const fetchTasks = async () => {
  const res = await fetch("/api/read-tasks");
  const tasksData = await res.json();
  return tasksData;
};

export const tasksData = await fetchTasks();
