import { LOCAL_STORAGE_KEYS } from "../constants/app";

import type { Task } from "../contexts/Tasks/Tasks.d";

export const storeTasks = (tasks: Task[]) => {
  localStorage.setItem(LOCAL_STORAGE_KEYS.TASKS, JSON.stringify(tasks));
};
