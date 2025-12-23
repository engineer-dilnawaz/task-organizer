import { Trash } from "lucide-react";

import type { Category as CategoryType } from "../stores/useCategories";

type CategoryProps = {
  index: number;
  category: CategoryType;
  disableDelete: (category: CategoryType) => boolean;
  onDelete: (id: string) => void;
};

export default function Category({
  index,
  category,
  onDelete,
  disableDelete,
}: CategoryProps) {
  const canDelete = disableDelete(category);
  return (
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
          canDelete ? "btn-disabled" : ""
        }`}
      >
        <Trash className="text-red-600" />
      </button>
    </li>
  );
}
