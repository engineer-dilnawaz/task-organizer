import { axiosInstance } from "../../api/axiosInstance";
import type { Task } from "./tasks";
import type { ApiResponse } from "../../api/api";

export const getTasks = async (): Promise<ApiResponse<Task[]>> => {
  const response = await axiosInstance.get("/tasks");
  return response.data;
};

export const createTask = async (task: Task): Promise<ApiResponse<Task>> => {
  const response = await axiosInstance.post("/tasks", task);
  return response.data;
};
