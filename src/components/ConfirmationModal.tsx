import { X } from "lucide-react";
import { forwardRef } from "react";

type ConfirmationModalProps = {
  title?: string;
  message?: string;
  onDelete?: () => void;
};

export const ConfirmationModal = forwardRef<
  HTMLDialogElement,
  ConfirmationModalProps
>((_props, ref) => {
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      const dialog = e.currentTarget;
      dialog.close();
    }
  };

  return (
    <dialog ref={ref} className="modal" onClick={handleBackdropClick}>
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            <X className="text-white" />
          </button>
        </form>
        <h3 className="font-bold text-lg">Delete Task</h3>
        <p className="py-4">
          Are you sure you want to delete this task? This action cannot be
          undone.
        </p>
        <div className="modal-action">
          <form method="dialog">
            <button className="btn btn-ghost">Cancel</button>
            <button
              className="btn btn-error"
              onClick={() => _props.onDelete?.()}
            >
              Delete
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

ConfirmationModal.displayName = "ConfirmationModal";
