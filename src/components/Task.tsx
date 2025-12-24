import { FilePenLine, Trash, X } from "lucide-react";
import type { Task as TaskType } from "../services/Task/tasks";

type TaskProps = {
  index: number;
  task: TaskType;
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (editingTask: TaskType) => void;
  editingTaskId?: string | null;
  isMarked?: boolean;
  handleMarkOrUnmarkTask?: (taskId: string) => void;
};

export const Task = ({
  index,
  task,
  onEdit,
  onToggle,
  onDelete,
  editingTaskId,
  isMarked,
  handleMarkOrUnmarkTask,
}: TaskProps) => {
  return (
    <tr>
      <th>
        <label>
          <input
            type="checkbox"
            className="checkbox"
            checked={isMarked}
            onChange={() => handleMarkOrUnmarkTask?.(task._id)}
          />
        </label>
      </th>
      <th>{index + 1}</th>
      <td>{task.title}</td>
      <td>
        <label className="label tooltip" data-tip="Toggle Completion">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={task.completed}
            onChange={() => onToggle?.(task._id)}
          />
          {task.completed ? "Completed" : "Incomplete"}
        </label>
      </td>

      <td>
        <div className="flex flex-col">
          {task.category.name}
          {task.category.isSystem && (
            <div className="badge badge-xs badge-soft uppercase">System</div>
          )}
        </div>
      </td>
      <td>
        <button
          className="btn btn-ghost m-0 tooltip"
          data-tip="Delete Task"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(task._id);
          }}
        >
          <Trash className="text-red-600" />
        </button>
        <button
          className="btn btn-ghost m-0 tooltip"
          data-tip={editingTaskId === task._id ? "Cancel Edit" : "Edit Task"}
          onClick={(e) => {
            e.stopPropagation();
            onEdit?.(task);
          }}
        >
          {editingTaskId === task._id ? (
            <X />
          ) : (
            <FilePenLine className="text-primary" />
          )}
        </button>
      </td>
    </tr>
  );
};
