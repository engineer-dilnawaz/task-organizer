import { create } from "zustand";
import type { Task } from "../services/Task/tasks";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants/app";

type ApiTasksType = {
  tasks: Task[];
  addMultipleTasks: (tasks: Task[]) => void;
  addTask: (task: Task) => void;
  deleteMultipleTasks: (taskIds: string[]) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, task: Task) => void;
  toggleTaskCompletion: (taskId: string) => void;
};

export const useApiTasks = create<ApiTasksType>()(
  persist(
    (set) => ({
      tasks: [],
      addMultipleTasks: (tasks) =>
        set((state) => ({ tasks: [...state.tasks, ...tasks] })),
      addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),

      deleteMultipleTasks: (taskIds) =>
        set((state) => ({
          tasks: state.tasks.filter(
            (task) => !taskIds.includes(task._id.toString())
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task._id.toString() !== taskId),
        })),
      editTask: (taskId, task) =>
        set((state) => ({
          tasks: state.tasks.map((_task) =>
            _task._id.toString() === taskId ? task : _task
          ),
        })),
      toggleTaskCompletion: (taskId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task._id.toString() === taskId
              ? { ...task, completed: !task.completed }
              : task
          ),
        })),
    }),
    { name: LOCAL_STORAGE_KEYS.API_TASKS }
  )
);
