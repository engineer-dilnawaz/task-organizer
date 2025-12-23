import { type FormEvent } from "react";
import type { NewTask } from "../pages/Home";
import { type Category } from "../stores/useCategories";
import { useTasks } from "../stores/useTasks";

type TaskFormProps = {
  newTask: NewTask;
  setNewTaskText: (value: string) => void;
  setNewTaskCategory: (value: string) => void;
  setNewTaskStatus: (value: boolean) => void;
  onAddNewTask: (event: FormEvent) => void;
  categoriesList: Category[];
  isEditMode: boolean;
};

export const TaskForm = ({
  newTask,
  setNewTaskText,
  setNewTaskCategory,
  setNewTaskStatus,
  onAddNewTask,
  categoriesList,
  isEditMode,
}: TaskFormProps) => {
  const addTask = useTasks((state) => state.addTask);
  return (
    <form
      onSubmit={onAddNewTask}
      className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4"
    >
      <fieldset className="fieldset">
        <label className="label">Task Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Write here..."
          value={newTask.taskText}
          onChange={(e) => setNewTaskText(e.target.value)}
        />
      </fieldset>

      <label className="label">Task Category</label>
      <select
        defaultValue="Select category"
        className="select w-full"
        value={newTask.taskCategory}
        onChange={(e) => setNewTaskCategory(e.target.value)}
      >
        {categoriesList.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 mt-2">
        <label className="label ">Mark as Completed</label>
        <input
          type="checkbox"
          checked={newTask.taskStatus}
          onChange={() => setNewTaskStatus(!newTask.taskStatus)}
          className="toggle toggle-primary"
        />
      </div>

      <button className="btn btn-neutral mt-4 w-full" type="submit">
        {isEditMode ? "Update Task" : "Add Task"}
      </button>
      <button
        onClick={() => {
          for (let i = 0; i < 30; i++) {
            addTask({
              task: `Task ${i}`,
            });
          }
        }}
      >
        Add Dummy Task 30
      </button>
    </form>
  );
};
