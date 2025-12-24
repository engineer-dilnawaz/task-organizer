import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../api/api";
import type { Task } from "./tasks";
import { getTasks } from "./tasks.api";

export const useFetchTasks = () => {
  return useQuery<ApiResponse<Task[]>>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
