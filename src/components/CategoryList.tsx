import { Trash } from "lucide-react";
import type { Category as CategoryType } from "../stores/useCategories";

type CategoryListProps = {
  categories: CategoryType[];
  disableDelete: (category: CategoryType) => boolean;
  onDelete: (id: string) => void;
};

function CategoryList({
  categories,
  onDelete,
  disableDelete,
}: CategoryListProps) {
  return (
    <ul className="list bg-base-200 rounded-box shadow-md mt-12 mx-8">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        All Categories added so far
      </li>
      {categories.map((category, index) => (
        <li className="list-row" key={category.id}>
          <div className="text-4xl font-thin opacity-30 tabular-nums">
            {`${index + 1}`.padStart(2, "0")}
          </div>

          <div className="list-col-grow text-lg font-semibold flex items-center">
            {category.name}
          </div>
          <button
            onClick={() => onDelete(category.id)}
            className={`btn btn-square btn-ghost cursor-pointer ${
              disableDelete(category) ? "btn-disabled" : ""
            }`}
          >
            <Trash className="text-red-600" />
          </button>
        </li>
      ))}
    </ul>
  );
}

export default CategoryList;
