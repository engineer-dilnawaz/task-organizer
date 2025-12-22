import { FilePenLine, Trash, X } from "lucide-react";
import type { Task as TaskType } from "../contexts/Tasks/Tasks";

type TaskProps = {
  index: number;
  task: TaskType;
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (editingTask: TaskType) => void;
  editingTaskId: string | null;
};

export const Task = ({
  index,
  task,
  onEdit,
  onToggle,
  onDelete,
  editingTaskId,
}: TaskProps) => {
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{task.task}</td>
      <td>
        <label className="label tooltip" data-tip="Toggle Completion">
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
          className="btn btn-ghost m-0 tooltip"
          data-tip="Delete Task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task.id);
          }}
        >
          <Trash className="text-red-600" />
        </button>
        <button
          className="btn btn-ghost m-0 tooltip"
          data-tip={editingTaskId === task.id ? "Cancel Edit" : "Edit Task"}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task);
          }}
        >
          {editingTaskId === task.id ? (
            <X />
          ) : (
            <FilePenLine className="text-primary" />
          )}
        </button>
      </td>
    </tr>
  );
};
