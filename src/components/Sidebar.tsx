import {
  BookCheck,
  CircleCheck,
  ChevronLeft,
  FolderDot,
  LayoutPanelLeft,
  Trash,
} from "lucide-react";
import { Link, useLocation } from "react-router";
import { useState } from "react";
import type { ReactNode } from "react";
import { randomColorGen } from "../utils/randomColorGen";

const NAV_BAR_LIST = [
  {
    id: 1,
    to: "/",
    title: "Dashboard",
    icon: LayoutPanelLeft,
  },
  {
    id: 2,
    to: "/my-tasks",
    title: "My Tasks",
    icon: CircleCheck,
  },
  {
    id: 3,
    to: "/category",
    title: "Categories",
    icon: FolderDot,
  },
  {
    id: 4,
    to: "/trash",
    title: "Trash",
    icon: Trash,
  },
];

const staticCollections = [
  {
    id: 1,
    name: "Design System",
    color: randomColorGen(),
  },
  {
    id: 2,
    name: "Task Management",
    color: randomColorGen(),
  },
  {
    id: 3,
    name: "Project Management",
    color: randomColorGen(),
  },
];

type AppSidebarProps = {
  children?: ReactNode;
};

export const AppSidebar = ({ children }: AppSidebarProps) => {
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleIconClick = () => {
    setIsExpanded(true);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <aside
        className={`flex flex-col bg-base-200 border-r border-base-300 transition-all duration-300 ${
          isExpanded ? "w-64" : "w-16"
        } shrink-0`}
      >
        <div
          className={`flex items-center gap-2 p-4 transition-all ${
            isExpanded ? "justify-start" : "justify-center"
          }`}
          onClick={isExpanded ? handleCollapse : handleIconClick}
        >
          <div className="bg-primary text-primary-content rounded-md text-xl h-10 w-10 flex items-center justify-center shrink-0">
            <BookCheck className="size-5" />
          </div>
          {isExpanded && (
            <div className="flex flex-col animate-in fade-in slide-in-from-left-2">
              <span className="text-sm font-bold">TaskManager</span>
              <span className="text-xs text-slate-400 leading-none">
                Pro Workspace
              </span>
            </div>
          )}
        </div>

        <ul className="menu w-full grow p-2">
          {NAV_BAR_LIST.map((item) => {
            const isActive = pathname === item.to;
            return (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className={`group relative flex items-center min-h-10 ${
                    isActive ? "active bg-primary text-primary-content" : ""
                  } ${
                    !isExpanded
                      ? "tooltip tooltip-right justify-center"
                      : "justify-start pl-3"
                  }`}
                  data-tip={!isExpanded ? item.title : undefined}
                >
                  {/* Icon - fixed size, positioned by parent flex container */}
                  <span className="flex items-center justify-center w-5 h-5 shrink-0">
                    <item.icon className="size-5" />
                  </span>
                  {/* Title that appears when expanded */}
                  {isExpanded && (
                    <span className="ml-3 whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                      {item.title}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}

          <div className="divider m-0" />
          {isExpanded && (
            <span className="text-sm text-gray-500 mt-0 px-2">Collections</span>
          )}
          {staticCollections.map((collection) => (
            <div
              key={collection.id}
              className={`flex items-center gap-2 py-1 ${
                isExpanded ? "px-2 justify-start" : "justify-center"
              } ${!isExpanded ? "tooltip tooltip-right" : ""}`}
              data-tip={collection.name}
            >
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: collection.color }}
              />
              {isExpanded && (
                <span className="text-sm whitespace-nowrap animate-in fade-in slide-in-from-left-2 duration-300">
                  {collection.name}
                </span>
              )}
            </div>
          ))}
        </ul>

        {isExpanded && (
          <div className="p-2 border-t border-base-300">
            <button
              onClick={handleCollapse}
              className="btn btn-ghost btn-sm w-full justify-start"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="size-4" />
              <span className="animate-in fade-in slide-in-from-left-2">
                Collapse
              </span>
            </button>
          </div>
        )}
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden">{children}</div>
    </div>
  );
};
