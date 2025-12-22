import { useRef, useState, type FormEvent } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { TaskForm } from "../components/TaskForm";
import { TaskList } from "../components/TaskList";
import type { Task } from "../contexts/Tasks/Tasks";
import { useCategoires } from "../stores/useCategories";
import { useTasks } from "../stores/useTasks";

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
  const [deletingTaskId, setDeletingTaskId] = useState<string | null>(null);

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
      setEditingTaskId(null);
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

  const handleDeleteConfirmation = (taskId: string) => {
    modalRef.current?.showModal();
    setDeletingTaskId(taskId);
  };

  const handleDeleteTask = () => {
    if (deletingTaskId) {
      deleteTask(deletingTaskId);
      setDeletingTaskId(null);
      modalRef.current?.close();
    }
  };

  const handleToggleCompletion = (taskId: string) => {
    toggleTaskCompletion(taskId);
  };

  const handleEdit = (editingTask: Task) => {
    if (editingTask.id === editingTaskId) {
      setEditingTaskId(null);
      setNewTask({
        taskCategory: DEFAULT_CATEGORY,
        taskStatus: false,
        taskText: "",
      });
      return;
    }
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
        isEditMode={Boolean(editingTaskId)}
      />

      <TaskList
        tasks={tasks}
        onToggle={handleToggleCompletion}
        onDelete={handleDeleteConfirmation}
        onEdit={handleEdit}
        editingTaskId={editingTaskId}
      />
      <ConfirmationModal ref={modalRef} onDelete={handleDeleteTask} />
    </div>
  );
};

export default Home;
