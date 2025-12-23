import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import ListContainer from "../components/DragNDrop/ListContainer";
import { useTasks } from "../stores/useTasks";

const columns = [
  { id: "incompleted", title: "Incompleted Tasks", isCompleted: false },
  { id: "completed", title: "Completed Tasks", isCompleted: true },
];

function DragDrop() {
  const tasks = useTasks((state) => state.tasks);
  const editTask = useTasks((state) => state.editTask);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const shouldBeCompleted = over.id === "completed";
    // No-op if dropped back into same column
    if (task.completed === shouldBeCompleted) return;

    editTask(taskId, {
      ...task,
      completed: shouldBeCompleted,
    });
  };

  const incompletedTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mt-6 mx-auto max-w-6xl px-4">
        <div className="grid gap-6 md:grid-cols-2">
          {columns.map((column) => (
            <ListContainer
              key={column.id}
              droppableId={column.id}
              listTitle={column.title}
              listItems={column.isCompleted ? completedTasks : incompletedTasks}
              isCompletedColumn={column.isCompleted}
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}

export default DragDrop;
