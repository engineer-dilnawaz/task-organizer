import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { TaskList } from "../components/TaskList";
import { useTasks } from "../stores/useTasks";
import { useCategoires } from "../stores/useCategories";

const Home = () => {
  const [input, setInput] = useState("");
  const [category, setCategory] = useState("Uncategorised");
  const [filterByCategory, setFilterByCategory] = useState("Uncategorised");
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const tasks = useTasks((state) => state.tasks);
  const addTask = useTasks((state) => state.addTask);
  const editTask = useTasks((state) => state.editTask);
  const deleteTask = useTasks((state) => state.deleteTask);
  const toggleTaskCompletion = useTasks((state) => state.toggleTaskCompletion);
  const clearCompleted = useTasks((state) => state.clearCompleted);
  const categories = useCategoires((state) => state.categories);

  const filteredTasks = tasks.filter(
    (task) => task.category === filterByCategory
  );

  const isInputEmpty = !input.trim();
  const compeletedTasksCount = tasks.filter((task) => task.completed).length;
  const inCompeletedTasksCount = tasks.filter((task) => !task.completed).length;

  const handleAddTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) {
      return;
    }
    if (editingTaskId) {
      editTask(editingTaskId, input, category);
      setEditingTaskId(null);
    } else {
      addTask(input, category);
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

      <select
        id="category"
        name="category"
        className="task-input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
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

      <select
        id="category"
        name="category"
        className="btn"
        onChange={(e) => setFilterByCategory(e.target.value)}
        value={filterByCategory}
      >
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <TaskList
        tasks={filteredTasks}
        onToggle={handleToggleCompletion}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

export default Home;
