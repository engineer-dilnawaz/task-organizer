import type { Task as TaskType } from "../contexts/Tasks/Tasks";
import { Task } from "./Task";

type TaskListProps = {
  tasks: TaskType[];
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (editingTask: TaskType) => void;
  editingTaskId?: string | null;
  handleMarkAllTasks?: () => void;
  handleMarkOrUnmarkTask?: (taskId: string) => void;
  markedTasksList?: string[];
};

export const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggle,
  editingTaskId,
  handleMarkAllTasks,
  markedTasksList,
  handleMarkOrUnmarkTask,
}: TaskListProps) => {
  return (
    <div className="overflow-x-auto w-full bg-base-200 mt-8">
      <table className="table">
        <thead>
          <tr>
            <th>
              <label>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={
                    markedTasksList?.length !== 0 &&
                    markedTasksList?.length === tasks.length
                  }
                  onChange={handleMarkAllTasks}
                />
              </label>
            </th>
            <th>#</th>
            <th>Task</th>
            <th>Task Status</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => (
            <Task
              key={task.id}
              index={index}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              editingTaskId={editingTaskId}
              isMarked={markedTasksList?.includes(task.id)}
              handleMarkOrUnmarkTask={handleMarkOrUnmarkTask}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
