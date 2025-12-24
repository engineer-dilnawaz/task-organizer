import type { ApiResponse } from "../../api/api";
import { axiosInstance } from "../../api/axiosInstance";
import type { Category } from "./category.d";

export const getCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};
