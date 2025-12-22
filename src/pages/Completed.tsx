import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

function Completed() {
  const { tasks } = useTasks();
  const taskList = tasks.filter((task) => task.completed);

  return <TaskList tasks={taskList} />;
}

export default Completed;
