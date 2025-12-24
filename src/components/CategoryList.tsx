import type { Category as CategoryType } from "../stores/useCategories";
import Category from "./Category";

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
    <ul className="list bg-base-200 rounded-box shadow-md mx-8">
      <li className="p-4 pb-2 text-xs opacity-60 tracking-wide">
        All categories added so far
      </li>
      {categories.map((category, index) => (
        <Category
          index={index}
          category={category}
          disableDelete={disableDelete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default CategoryList;
