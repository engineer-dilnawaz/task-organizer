import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

function Completed() {
  const tasks = useTasks((state) => state.tasks);
  const taskList = tasks.filter((task) => task.completed);

  return (
    <div className="mx-8">
      <TaskList tasks={taskList} />
    </div>
  );
}

export default Completed;
