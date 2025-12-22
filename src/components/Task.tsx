import { FilePenLine, Trash } from "lucide-react";
import type { Task as TaskType } from "../contexts/Tasks/Tasks";

type TaskProps = {
  index: number;
  task: TaskType;
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (editingTask: TaskType) => void;
};

export const Task = ({
  index,
  task,
  onEdit,
  onToggle,
  onDelete,
}: TaskProps) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{task.task}</td>
      <td>
        <label className="label">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={task.completed}
            onChange={() => onToggle?.(task.id)}
          />
          {task.completed ? "Completed" : "Incomplete"}
        </label>
      </td>

      <td>{task.category}</td>
      <td>
        <button
          className="btn btn-ghost m-0"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task.id);
          }}
        >
          <Trash className="text-red-600" />
        </button>
        <button
          className="btn btn-ghost m-0"
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task);
          }}
        >
          <FilePenLine className="text-primary" />
        </button>
      </td>
    </tr>
  );
};
