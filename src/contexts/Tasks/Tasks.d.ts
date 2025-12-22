export type Task = {
  id: string;
  task: string;
  completed: boolean;
};

export type TasksContextType = {
  tasks: Task[];
  addTask: (task: string) => void;
  deleteTask: (taskId: string) => void;
  editTask: (taskId: string, task: string) => void;
  clearCompleted: () => void;
  toggleTaskCompletion: (taskId: string) => void;
};
