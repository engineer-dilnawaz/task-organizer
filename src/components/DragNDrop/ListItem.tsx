import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../contexts/Tasks/Tasks";

type ListItemProps = {
  task: Task;
};
export default function ListItem({ task }: ListItemProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      key={task.id}
      className={`bg-base-200 p-2 rounded-box flex justify-between items-center cursor-grab ${
        isDragging ? "opacity-75" : ""
      } ${
        task.completed
          ? "animate-slide-to-completed"
          : "animate-slide-to-incompleted"
      }`}
    >
      <span>{task.task}</span>
      <div
        className={`badge badge-soft ${
          task.completed ? "badge-success" : "badge-warning"
        } text-xs uppercase font-semibold opacity-60`}
      >
        {task.category}
      </div>
    </div>
  );
}
