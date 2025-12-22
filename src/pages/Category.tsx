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
    <>
      <div className="card bg-base-300 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-4">
        <div className="card-body">
          <fieldset className="fieldset">
            <label className="label" htmlFor="category-name-input">
              Category Name
            </label>
            <input
              id="category-name-input"
              className={`input outline-none ${
                hasExistingCategory ? "border-error text-error" : ""
              }`}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter category name"
            />
            {hasExistingCategory && (
              <span className="text-error">
                A category with this name already exists.
              </span>
            )}
            <button
              className="btn btn-neutral mt-4"
              disabled={isInputEmpty || hasExistingCategory}
              onClick={handleAddCategory}
            >
              Add Category
            </button>
          </fieldset>
        </div>
      </div>
      <CategoryList
        categories={categories}
        disableDelete={shouldAllowDelete}
        onDelete={handleDeleteCategory}
      />
    </>
  );
}

export default Category;
