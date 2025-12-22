import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

function InCompleted() {
  const tasks = useTasks((state) => state.tasks);
  const taskList = tasks.filter((task) => !task.completed);

  return <TaskList tasks={taskList} />;
}

export default InCompleted;
