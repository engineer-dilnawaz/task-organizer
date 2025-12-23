import { create } from "zustand";
import { persist, subscribeWithSelector } from "zustand/middleware";
import { LOCAL_STORAGE_KEYS } from "../constants/app";

type Task = {
  id: string;
  task: string;
  completed: boolean;
  category: string;
};

type TasksType = {
  tasks: Task[];
  recentlyDeletedTask: (Task & { index: number }) | null;

  addTask: (newTask: Omit<Partial<Task>, "id"> & Pick<Task, "task">) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, editTask: Omit<Task, "id">) => void;
  clearCompleted: () => void;
  toggleTaskCompletion: (taskId: string) => void;
  restoreTask: () => void;
  clearRecentlyDeleted: () => void;
};

const useTasks = create<TasksType>()(
  subscribeWithSelector(
    persist(
      (set) => ({
        tasks: [],
        recentlyDeletedTask: null,
        addTask: (newTask: Omit<Partial<Task>, "id"> & Pick<Task, "task">) =>
          set((state) => {
            return {
              tasks: [
                {
                  id: crypto.randomUUID(),
                  completed: newTask?.completed ?? false,
                  category: newTask?.category ?? "Uncategorised",
                  task: newTask.task,
                },
                ...state.tasks,
              ],
            };
          }),
        deleteTask: (taskId) =>
          set((state) => {
            const deletedTask = state.tasks.find((t) => t.id === taskId);
            return {
              recentlyDeletedTask: deletedTask
                ? { ...deletedTask, index: state.tasks.indexOf(deletedTask) }
                : null,
              tasks: state.tasks.filter((t) => t.id !== taskId),
            };
          }),
        restoreTask: () =>
          set((state) => {
            if (state.recentlyDeletedTask) {
              const { index, ...deletedTask } = state.recentlyDeletedTask;
              return {
                tasks: [
                  ...state.tasks.slice(0, index),
                  deletedTask,
                  ...state.tasks.slice(index + 1),
                ],
                recentlyDeletedTask: null,
              };
            } else return {};
          }),
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
              taskId === task.id
                ? { ...task, completed: !task.completed }
                : task
            ),
          })),
        clearRecentlyDeleted: () => set({ recentlyDeletedTask: null }),
      }),
      { name: LOCAL_STORAGE_KEYS.TASKS }
    )
  )
);

export { useTasks };
