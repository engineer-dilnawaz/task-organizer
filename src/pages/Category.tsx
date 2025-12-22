import { useState, type FormEvent } from "react";
import {
  useCategoires,
  type Category as CategoryType,
} from "../stores/useCategories";
import CategoryList from "../components/CategoryList";

function Category() {
  const [input, setInput] = useState("");
  const isInputEmpty = !input.trim();
  const addCategory = useCategoires().addCategory;
  const deleteCategory = useCategoires().deleteCategory;
  const categories = useCategoires().categories;

  const hasExistingCategory = categories.some(
    (cat) => cat.name.toLocaleLowerCase() === input.trim().toLowerCase()
  );

  const handleAddCategory = (e: FormEvent) => {
    e.preventDefault();
    if (isInputEmpty || hasExistingCategory) {
      return;
    }
    addCategory(input);
    setInput("");
  };

  const handleDeleteCategory = (id: string) => {
    deleteCategory(id);
  };

  const shouldAllowDelete = (category: CategoryType) =>
    category.name.toLowerCase() === "Uncategorised".toLowerCase();

  return (
    <div className="category-container">
      <form onSubmit={handleAddCategory} className="task-form">
        <div className="input-with-error">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter category name"
            className={`task-input ${
              isInputEmpty || hasExistingCategory ? "task-input-error" : ""
            }`}
          />
          {hasExistingCategory && (
            <span className="error">
              A category with this name already exists.
            </span>
          )}
        </div>

        <button disabled={isInputEmpty || hasExistingCategory} className="btn">
          {"Add Category"}
        </button>
      </form>

      <CategoryList
        categories={categories}
        disableDelete={shouldAllowDelete}
        onDelete={handleDeleteCategory}
      />
    </div>
  );
}

export default Category;
