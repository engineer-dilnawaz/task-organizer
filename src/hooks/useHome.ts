import { useFetchTasks } from "../services/Task/useFetchTasks.hooks";

export const useHome = () => {
  const { data: tasks, isLoading, error, isFetching } = useFetchTasks();

  return {
    tasks: tasks?.data,
    isLoading,
    error,
    isFetching,
    message: tasks?.message,
  };
};
