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
  addTask: (newTask: Omit<Partial<Task>, "id"> & Pick<Task, "task">) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, editTask: Omit<Task, "id">) => void;
  clearCompleted: () => void;
  toggleTaskCompletion: (taskId: string) => void;
};

const useTasks = create<TasksType>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (newTask: Omit<Partial<Task>, "id"> & Pick<Task, "task">) =>
        set((state) => ({
          tasks: [
            {
              id: crypto.randomUUID(),
              completed: newTask?.completed ?? false,
              category: newTask?.category ?? "Uncategorised",
              task: newTask.task,
            },
            ...state.tasks,
          ],
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((item) => item.id !== taskId),
        })),
      editTask: (taskId, editTask: Omit<Task, "id">) =>
        set((state) => ({
          tasks: state.tasks.map((taskItem) =>
            taskId === taskItem.id
              ? {
                  ...taskItem,
                  task: editTask.task,
                  category: editTask.category,
                  completed: editTask.completed,
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
