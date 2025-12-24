import {
  Check,
  Hourglass,
  NotepadText,
  Plus,
  Search,
  TrendingUp,
  type LucideProps,
} from "lucide-react";

export default function Home() {
  return (
    <div className="mx-8 my-4 flex flex-col gap-4 ">
      <div className="flex items-center justify-between gap-2">
        <div className="flex flex-col">
          <span className="text-2xl font-bold">Dashboard</span>
          <span>
            Welcome back, <span className="font-bold">Dilnawaz</span>
          </span>
        </div>

        <form className="flex items-center gap-2">
          <label className="input input-md outline-none">
            <Search />
            <input type="text" className="grow" placeholder="Search Tasks" />
          </label>
          <button className="btn btn-primary btn-md">
            <Plus className="size-4" />
            <span>New Task</span>
          </button>
        </form>
      </div>

      <div className="flex flex-wrap gap-4">
        <StatsCard title="Total" Icon={NotepadText} color="primary">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">{100}</span>
            <div className="flex items-end gap-1 text-success text-sm">
              <TrendingUp className="size-4" />
              <span className="text-sm">+{10}%</span>
            </div>
          </div>
        </StatsCard>
        <StatsCard title="Completed" Icon={Check} color="success">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold ">{32}</span>
            <div className="flex items-center gap-1 text-success text-sm">
              <span>+4 Today</span>
            </div>
          </div>
        </StatsCard>
        <StatsCard title="Pending" Icon={Hourglass} color="warning">
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold ">{6}</span>
            <span className="text-xs text-zinc-600">overdue</span>
          </div>
        </StatsCard>
        <StatsCard title="Progress" Icon={Hourglass} color="warning">
          <></>
        </StatsCard>
      </div>
    </div>
  );
}

interface StatsProps {
  title: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  color: "primary" | "success" | "warning" | "info" | "neutral";
  children: React.ReactNode;
}
function StatsCard({ title, Icon, color, children }: StatsProps) {
  return (
    <div className="card rounded-md bg-base-200 flex-1 shrink-0  min-w-[300px]">
      <div className="card-body">
        <div className="flex items-center justify-between capitalize text-sm text-zinc-600">
          <h2>{title}</h2>
          <div className={`bg-${color}/20 rounded-full p-1`}>
            <Icon className={`size-4 text-${color}`} />
          </div>
        </div>
        <div className="card-actions">{children}</div>
      </div>
    </div>
  );
}
