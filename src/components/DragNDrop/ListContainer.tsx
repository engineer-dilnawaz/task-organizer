import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../../contexts/Tasks/Tasks";
import ListItem from "./ListItem";

type ListContainerProps = {
  listTitle: string;
  listItems: Task[];
  isCompletedColumn: boolean;
  droppableId: string;
};

export default function ListContainer({
  listTitle,
  listItems,
  isCompletedColumn,
  droppableId,
}: ListContainerProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: droppableId,
  });

  const borderColor = isOver ? "border-primary" : "border-base-300";
  const bgColor = isOver ? "bg-base-200" : "bg-neutral";

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col gap-4 ${bgColor} min-w-lg p-4 rounded-box border-2 border-dashed ${borderColor} transition-colors`}
    >
      <div
        className={`${
          isCompletedColumn ? "bg-success" : "bg-warning"
        } p-2 rounded-box `}
      >
        <h2
          className={`text-2xl font-bold ${
            isCompletedColumn ? "text-success-content" : "text-warning-content"
          } `}
        >
          {listTitle}
        </h2>
      </div>
      <div className="flex flex-col gap-4 ">
        {listItems.map((task) => (
          <ListItem key={task.id} task={task} />
        ))}
        {listItems.length === 0 && (
          <div className="text-center text-base-content/60 py-4 text-sm">
            Drag a task here
          </div>
        )}
      </div>
    </div>
  );
}
