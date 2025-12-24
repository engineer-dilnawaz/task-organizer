import { useRef } from "react";
import { ConfirmationModal } from "../components/ConfirmationModal";
import { EmptyState } from "../components/EmptyState";
import { Loading } from "../components/Loading";
import { QuickAction } from "../components/QuickAction";
import { TaskList } from "../components/TaskList";
import { useHome } from "../hooks/useHome";

export type NewTask = {
  taskText: string;
  taskCategory: string;
  taskStatus: boolean;
};

const MyTasks = () => {
  const { tasks, isFetching, error, message } = useHome();

  const modalRef = useRef<HTMLDialogElement>(null);
  const markedTasksList = [];

  if (isFetching) {
    return (
      <div className="flex flex-col items-center mt-4 mx-8">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center mt-4 mx-8">
        <div role="alert" className="w-full  alert alert-error alert-soft mb-4">
          <span className="">{error.message}</span>
        </div>
      </div>
    );
  }

  if (tasks && tasks.length === 0) {
    return (
      <div className="flex flex-col items-center mt-4 mx-8">
        <EmptyState message={message} />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mx-4">
      <TaskList
        tasks={tasks || []}
        onToggle={() => {}}
        onDelete={() => {}}
        onEdit={() => {}}
        editingTaskId={null}
        handleMarkAllTasks={() => {}}
        handleMarkOrUnmarkTask={() => {}}
        markedTasksList={[]}
      />

      <ConfirmationModal ref={modalRef} onDelete={() => {}} />

      {markedTasksList.length > 0 && (
        <QuickAction onComplete={() => {}} onDelete={() => {}} />
      )}
    </div>
  );
};

export default MyTasks;
