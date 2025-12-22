import { useRef } from "react";
import { Link } from "react-router";
import { NavBarItem } from "./NavBarList";
import { ThemeSwitch } from "./ThemeSwitch";

type NavbarItem = {
  to: `/${string}`;
  title: string;
};

const navbarList: NavbarItem[] = [
  {
    to: "/all",
    title: "All",
  },
  {
    to: "/completed",
    title: "Completed",
  },
  {
    to: "/incompleted",
    title: "Incompleted",
  },
  {
    to: "/counter",
    title: "Counter",
  },
  {
    to: "/category",
    title: "Category",
  },
];

export default function Header() {
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleLinkClick = () => {
    buttonRef.current?.classList.add("dropdown-close");
  };

  const handleButtonClick = () => {
    buttonRef.current?.classList.remove("dropdown-close");
  };

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown" ref={buttonRef}>
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={handleButtonClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {navbarList.map((navbarItem) => (
              <NavBarItem
                key={navbarItem.to}
                to={navbarItem.to}
                title={navbarItem.title}
                onClick={handleLinkClick}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/">
          <span>
            Task
            <span className="text-rotate ml-1">
              <span>
                <span className=" bg-primary text-primary-content px-1 rounded-sm">
                  Create
                </span>
                <span className=" bg-secondary text-secondary-content px-1 rounded-sm">
                  Organize
                </span>
                <span className=" bg-accent text-accent-content px-1 rounded-sm">
                  Filter
                </span>
              </span>
            </span>
          </span>
        </Link>
      </div>
      <div className="navbar-end">
        <ThemeSwitch />
      </div>
    </div>
  );
}
