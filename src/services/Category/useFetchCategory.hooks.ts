import { useQuery } from "@tanstack/react-query";
import type { ApiResponse } from "../../api/api";
import type { Category } from "./category.d";
import { getCategories } from "./category.api";

export const useFetchCategory = () => {
  return useQuery<ApiResponse<Category[]>>({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
