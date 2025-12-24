import toast, { ToastBar, Toaster } from "react-hot-toast";

import { useTasks } from "../stores/useTasks.ts";

export const ToastWrapper = () => {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          padding: 0,
        },
      }}
    >
      {(t) => {
        if (t.id === "task-deleted") {
          return (
            <ToastBar toast={t}>
              {({ message }) => (
                <div className="flex items-center justify-between min-h-14 w-full bg-primary text-primary-content px-4 py-0 rounded-md">
                  <span className=" mr-8">{message}</span>

                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => {
                      useTasks.getState().restoreTask();
                      toast.dismiss(t.id);
                    }}
                  >
                    Undo
                  </button>
                </div>
              )}
            </ToastBar>
          );
        }

        return <ToastBar toast={t}>{({ message }) => message}</ToastBar>;
      }}
    </Toaster>
  );
};
