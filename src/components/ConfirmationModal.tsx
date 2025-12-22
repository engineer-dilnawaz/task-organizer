import { X } from "lucide-react";
import { forwardRef } from "react";

type ConfirmationModalProps = {
  title?: string;
};

export const ConfirmationModal = forwardRef<
  HTMLDialogElement,
  ConfirmationModalProps
>((props, ref) => {
  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          {/* Native <form method="dialog"> handles closing automatically */}
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
            <button className="btn">Cancel</button>
            <button className="btn btn-error ml-2">Delete</button>
          </form>
        </div>
      </div>
    </dialog>
  );
});

ConfirmationModal.displayName = "ConfirmationModal";
