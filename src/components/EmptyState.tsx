type EmptyStateProps = {
  message?: string;
};

export const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div role="alert" className="alert alert-error alert-soft w-full ">
      <span className="place-items-center">{message || "No tasks found."}</span>
    </div>
  );
};
