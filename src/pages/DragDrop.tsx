import { DndContext, type DragEndEvent } from "@dnd-kit/core";

import ListContainer from "../components/DragNDrop/ListContainer";
import { useTasks } from "../stores/useTasks";
import { ArrowLeftRight } from "lucide-react";

const columns = [
  { id: "incompleted", title: "Incompleted Tasks", isCompleted: false },
  { id: "completed", title: "Completed Tasks", isCompleted: true },
];

function DragDrop() {
  const tasks = useTasks((state) => state.tasks);
  const editTask = useTasks((state) => state.editTask);

  const incompletedTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

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

  const handleSwapColumns = () => {
    const tempIncompletedTasks = [...incompletedTasks];
    const tempCompletedTasks = [...completedTasks];

    tempIncompletedTasks.forEach((task) => {
      editTask(task.id, {
        ...task,
        completed: true,
      });

      tempCompletedTasks.forEach((task) => {
        editTask(task.id, {
          ...task,
          completed: false,
        });
      });
    });
    tempCompletedTasks.forEach((task) => {
      editTask(task.id, {
        ...task,
        completed: false,
      });
    });
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="mt-6 mx-auto max-w-6xl px-4">
        <div className="relative">
          <div className="grid gap-20 md:grid-cols-2">
            {columns.map((column) => (
              <ListContainer
                key={column.id}
                droppableId={column.id}
                listTitle={column.title}
                listItems={
                  column.isCompleted ? completedTasks : incompletedTasks
                }
                isCompletedColumn={column.isCompleted}
              />
            ))}
          </div>
          <button
            onClick={handleSwapColumns}
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center w-12 h-12 bg-base-100 rounded-full shadow-md border-2 border-base-content/70 text-base-content/70 cursor-pointer hover:border-primary transition-all duration-300 hover:text-primary hover:rotate-180 hover:scale-125 "
          >
            <ArrowLeftRight size={20} />
          </button>
        </div>
      </div>
    </DndContext>
  );
}

export default DragDrop;
