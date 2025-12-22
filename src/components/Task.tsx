import type { Task as TaskType } from "../contexts/Tasks/Tasks";

type TaskProps = {
  task: TaskType;
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, task: string) => void;
};

export const Task = ({ task, onEdit, onToggle, onDelete }: TaskProps) => {
  return (
    <li
      className={`task-container ${
        task.completed ? "task-container-completed" : ""
      }`}
      onClick={() => onToggle?.(task.id)}
    >
      <p
        role="button"
        className={`task ${task.completed ? "task-completed" : ""}`}
      >
        {task.task}
      </p>
      <div className="action-container">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task.id);
          }}
          className="action-btn"
        >
          ❌
        </button>
        <button
          className="action-btn"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task.id, task.task);
          }}
        >
          ✏️
        </button>
      </div>
    </li>
  );
};
