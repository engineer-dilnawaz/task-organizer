import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

export default function All() {
  const tasks = useTasks((state) => state.tasks);

  return <TaskList tasks={tasks} />;
}
