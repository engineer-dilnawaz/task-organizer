import { useTasks } from "../stores/useTasks";
import toast from "react-hot-toast";

let previousTasks = useTasks.getState().tasks;
let undoTimeout: number | null = null;

useTasks.subscribe(
  (state) => state.tasks,
  (tasks) => {
    // Task added
    if (tasks.length > previousTasks.length) {
      // toast.success("Task added");
      return null;
    }
    if (undoTimeout) {
      clearTimeout(undoTimeout);
    }
    // Task deleted
    if (tasks.length < previousTasks.length) {
      toast.error(
        "Task deleted! You can undo it by clicking the undo button.",
        {
          id: "task-deleted",
        }
      );
    }

    // Completion toggled
    const changedTask = tasks.find(
      (task, i) =>
        previousTasks[i] && task.completed !== previousTasks[i].completed
    );
    if (changedTask && changedTask.completed) {
      toast.success("Task completed 🎉");
    }

    // ⏱ Auto cleanup after toast duration
    undoTimeout = setTimeout(() => {
      useTasks.getState().clearRecentlyDeleted();
      undoTimeout = null;
    }, 5000);

    previousTasks = tasks;
  }
);
