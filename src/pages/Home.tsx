import { useRef, useState, type FormEvent } from "react";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import type { Task } from "../contexts/Tasks/Tasks";
import { useCategoires } from "../stores/useCategories";
import { useTasks } from "../stores/useTasks";
import { ConfirmationModal } from "../components/ConfirmationModal";

export type NewTask = {
  taskText: string;
  taskCategory: string;
  taskStatus: boolean;
};

const DEFAULT_CATEGORY = "Uncategorised";

const Home = () => {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const tasks = useTasks((state) => state.tasks);
  const addTask = useTasks((state) => state.addTask);
  const editTask = useTasks((state) => state.editTask);
  const modalRef = useRef<HTMLDialogElement>(null);

  const [newTask, setNewTask] = useState<NewTask>({
    taskText: "",
    taskCategory: DEFAULT_CATEGORY,
    taskStatus: false,
  });

  const deleteTask = useTasks((state) => state.deleteTask);
  const toggleTaskCompletion = useTasks((state) => state.toggleTaskCompletion);

  const categories = useCategoires((state) => state.categories);

  const setNewTaskText = (text: string) => {
    setNewTask((prev) => ({ ...prev, taskText: text }));
  };

  const setNewTaskCategory = (category: string) => {
    setNewTask((prev) => ({ ...prev, taskCategory: category }));
  };

  const setNewTaskStatus = (status: boolean) => {
    setNewTask((prev) => ({ ...prev, taskStatus: status }));
  };

  const handleAddNewTask = (event: FormEvent) => {
    event.preventDefault();
    if (!newTask.taskText.trim()) {
      return;
    }

    if (editingTaskId) {
      editTask(editingTaskId, {
        task: newTask.taskText,
        category: newTask.taskCategory,
        completed: newTask.taskStatus,
      });
    } else {
      addTask({
        task: newTask.taskText,
        category: newTask.taskCategory,
        completed: newTask.taskStatus,
      });
    }

    setNewTask({
      taskCategory: DEFAULT_CATEGORY,
      taskStatus: false,
      taskText: "",
    });
  };

  const handleDelete = (taskId: string) => {
    console.log(taskId);
    modalRef.current?.showModal();
    // deleteTask(taskId);
  };

  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId);
  };

  const handleEdit = (editingTask: Task) => {
    setEditingTaskId(editingTask.id);
    setNewTask({
      taskCategory: editingTask.category,
      taskStatus: editingTask.completed,
      taskText: editingTask.task,
    });
  };

  return (
    <div className="flex flex-col items-center mt-4 mx-8">
      <TaskForm
        newTask={newTask}
        setNewTaskText={setNewTaskText}
        setNewTaskCategory={setNewTaskCategory}
        setNewTaskStatus={setNewTaskStatus}
        onAddNewTask={handleAddNewTask}
        categoriesList={categories}
        isEditMode={!!editingTaskId}
      />

      {/* <div className="stats-container">
        <p>
          Completed:{" "}
          <strong className="stats-count">{compeletedTasksCount}</strong>
        </p>
        <p>
          Incompleted:{" "}
          <strong className="stats-count">{inCompeletedTasksCount}</strong>
        </p>
      </div> */}
      {/* <motion.button
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
      </motion.button> */}

      {/* <select
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
      </select> */}

      <TaskList
        tasks={tasks}
        onToggle={handleToggleCompletion}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
      <ConfirmationModal />
    </div>
  );
};

export default Home;
