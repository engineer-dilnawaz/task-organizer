import type { Category as CategoryType } from "../stores/useCategories";

type CategoryProps = {
  category: CategoryType;
  disableDelete: (category: CategoryType) => boolean;
  onDelete: (id: string) => void;
};

export default function Category({
  category,
  onDelete,
  disableDelete,
}: CategoryProps) {
  const canDelete = disableDelete(category);
  return (
    <li className="category-item">
      <button
        onClick={() => onDelete(category.id)}
        disabled={canDelete}
        className={`${canDelete ? "disabled-button" : ""}`}
      >
        <span>{category.name}</span>
        <span className="trash">❌</span>
      </button>
    </li>
  );
}
