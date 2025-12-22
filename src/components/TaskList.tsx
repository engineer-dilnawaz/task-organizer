import type { Task as TaskType } from "../contexts/Tasks/Tasks";
import { Task } from "./Task";

type TaskListProps = {
  tasks: TaskType[];
  onToggle?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string, task: string) => void;
};

export const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggle,
}: TaskListProps) => {
  return (
    <ul className="task-list">
      {tasks.length === 0 ? (
        <p>Oops No tasks added yet..</p>
      ) : (
        tasks.map((task) => {
          return (
            <Task
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          );
        })
      )}
    </ul>
  );
};
