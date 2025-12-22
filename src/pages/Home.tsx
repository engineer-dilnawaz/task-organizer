import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";

const Home = () => {
  const [input, setInput] = useState("");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const tasks = useTasks((state) => state.tasks);
  const addTask = useTasks((state) => state.addTask);
  const editTask = useTasks((state) => state.editTask);
  const deleteTask = useTasks((state) => state.deleteTask);
  const toggleTaskCompletion = useTasks((state) => state.toggleTaskCompletion);
  const clearCompleted = useTasks((state) => state.clearCompleted);
  const isInputEmpty = !input.trim();
  const compeletedTasksCount = tasks.filter((task) => task.completed).length;
  const inCompeletedTasksCount = tasks.filter((task) => !task.completed).length;

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }
    if (editingTaskId) {
      editTask(editingTaskId, input);
      setEditingTaskId(null);
    } else {
      addTask(input);
    }
    setInput("");
  };

  const handleDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId);
  };

  const handleEdit = (taskId: string, task: string) => {
    setEditingTaskId(taskId);
    setInput(task);
  };

  return (
    <div className="tasks-container">
      <form onSubmit={handleAddTask} className="task-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Jot Down your task"
          className={`task-input ${isInputEmpty ? "task-input-error" : ""}`}
        />

        <button disabled={isInputEmpty} className="btn">
          {editingTaskId ? "Edit Task" : "Add Task"}
        </button>
      </form>

      <div className="stats-container">
        <p>
          Completed:{" "}
          <strong className="stats-count">{compeletedTasksCount}</strong>
        </p>
        <p>
          Incompleted:{" "}
          <strong className="stats-count">{inCompeletedTasksCount}</strong>
        </p>
      </div>
      <motion.button
        whileHover={{
          scale: 1.1,
          backgroundColor: "red",
          color: "#fff",
          transition: {
            duration: 0.3,
            type: "spring",
          },
        }}
        className="btn clear-completed"
        onClick={clearCompleted}
      >
        Clear Completed
      </motion.button>

      <TaskList
        tasks={tasks}
        onToggle={handleToggleCompletion}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Home;
