import { useFetchCategory } from "../services/Category/useFetchCategory.hooks";

export const useCategory = () => {
  const { data: categories, isLoading, error } = useFetchCategory();

  return { categories, isLoading, error };
};
