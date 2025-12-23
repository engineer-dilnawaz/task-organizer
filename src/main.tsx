import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import toast, { ToastBar, Toaster } from "react-hot-toast";

import "./listeners/taskListeners";

import App from "./App.tsx";
import "./index.css";
import { useTasks } from "./stores/useTasks.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
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
    <App />
  </StrictMode>
);
