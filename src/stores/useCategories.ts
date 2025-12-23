import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants/app";
import { useTasks } from "./useTasks";

export type Category = {
  id: string;
  name: string;
};

type CategoryType = {
  categories: Category[];
  addCategory: (name: string) => void;
  deleteCategory: (id: string) => void;
};

export const useCategoires = create<CategoryType>()(
  persist(
    (set) => ({
      categories: [
        {
          id: "1",
          name: "Uncategorised",
        },
      ],
      addCategory: (name) =>
        set((state) => ({
          categories: [
            ...state.categories,
            {
              id: crypto.randomUUID(),
              name: name,
            },
          ],
        })),
      deleteCategory: (id) =>
        set((state) => {
          if (id === "1")
            throw new Error("This is read only category. You cannot delete it");
          else {
            const filteredCategory = state.categories.find(
              (cat) => cat.id === id
            );
            if (filteredCategory) {
              const allFilteredTasks = useTasks
                .getState()
                .tasks.filter(
                  (task) => task.category === filteredCategory.name
                );
              allFilteredTasks.forEach((filteredTask) => {
                useTasks.getState().editTask(filteredTask.id, filteredTask);
              });
            }
            return {
              categories: state.categories.filter(
                (category) => category.id !== id
              ),
            };
          }
        }),
    }),
    { name: LOCAL_STORAGE_KEYS.CATEGORIES }
  )
);
