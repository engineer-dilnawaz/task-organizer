import type { Task as TaskType } from "../services/Task/tasks";
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
  handleMarkAllTasks,
  markedTasksList,
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
              key={task._id}
              index={index}
              task={task}
              onToggle={() => {}}
              onDelete={() => {}}
              onEdit={() => {}}
              editingTaskId={null}
              isMarked={false}
              handleMarkOrUnmarkTask={() => {}}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
