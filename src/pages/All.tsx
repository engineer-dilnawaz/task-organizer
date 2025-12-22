import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

export default function All() {
  const tasks = useTasks((state) => state.tasks);

  return (
    <div className="mx-8">
      <TaskList tasks={tasks} />
    </div>
  );
}
