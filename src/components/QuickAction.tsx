import { ListChecks, Trash } from "lucide-react";

type QuickActionProps = {
  onComplete: () => void;
  onDelete: () => void;
};

export const QuickAction = ({ onComplete, onDelete }: QuickActionProps) => {
  return (
    <div className="dock dock-xl slide-in">
      <button className="text-error cursor-pointer" onClick={onDelete}>
        <Trash />
        <span className="dock-label">Delete Marked Tasks</span>
      </button>

      <button className="text-primary cursor-pointer" onClick={onComplete}>
        <ListChecks />
        <span className="dock-label">Complete Marked Tasks</span>
      </button>
    </div>
  );
};
