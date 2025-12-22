import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants/app";

type Task = {
  id: string;
  task: string;
  completed: boolean;
  category: string;
};

type TasksType = {
  tasks: Task[];
  addTask: (task: string, category?: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, task: string, category?: string) => void;
  clearCompleted: () => void;
  toggleTaskCompletion: (taskId: string) => void;
};

const useTasks = create<TasksType>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task, category = "Uncategorised") =>
        set((state) => ({
          tasks: [
            {
              task,
              id: crypto.randomUUID(),
              completed: false,
              category: category,
            },
            ...state.tasks,
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((item) => item.id !== taskId),
        })),
      editTask: (taskId, task, category) =>
        set((state) => ({
          tasks: state.tasks.map((taskItem) =>
            taskId === taskItem.id
              ? {
                  ...taskItem,
                  task,
                  category: category ? category : taskItem.category,
                }
              : taskItem
          ),
        })),
      clearCompleted: () =>
        set((state) => ({
          tasks: state.tasks.filter((task) => !task.completed),
        })),
      toggleTaskCompletion: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            taskId === task.id ? { ...task, completed: !task.completed } : task
          ),
        })),
    }),
    { name: LOCAL_STORAGE_KEYS.TASKS }
  )
);

export { useTasks };
