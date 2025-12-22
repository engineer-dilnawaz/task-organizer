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
    <ul className="categories-list">
      {categories.map((category) => (
        <Category
          key={category.id}
          category={category}
          disableDelete={disableDelete}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default CategoryList;
