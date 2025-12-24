import { useHome } from "../hooks/useHome";
import { AnimatedCounter } from "./AnimatedCounter";

export const Stats = () => {
  const tasks = useHome().tasks ?? [];
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  return (
    <div className="stats shadow bg-base-200 ">
      <div className="stat">
        <div className="stat-figure text-primary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Total Tasks</div>
        <div className="stat-value text-primary">
          <AnimatedCounter count={totalTasks} />
        </div>
        <div className="stat-desc">Total tasks added so far</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-8 w-8 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            ></path>
          </svg>
        </div>
        <div className="stat-title">Completed Tasks</div>
        <div className="stat-value text-secondary">
          <AnimatedCounter count={completedTasks} />
        </div>
        <div className="stat-desc">Completed tasks so far</div>
      </div>

      <div className="stat">
        <div className="stat-figure text-secondary">
          <div className="avatar avatar-online">
            <div className="w-16 rounded-full">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiflFq7U8b6GzsL4gJQYs_86jarOjddDOfwg&s" />
            </div>
          </div>
        </div>
        <div className="stat-value">
          <AnimatedCounter
            count={
              totalTasks === 0
                ? 0
                : Number(((completedTasks / totalTasks) * 100).toFixed(0))
            }
            appendText="%"
          />
        </div>
        <div className="stat-title">Tasks done</div>
        <div className="stat-desc text-secondary">
          {totalTasks - completedTasks} tasks remaining
        </div>
      </div>
    </div>
  );
};
