import { Link } from "react-router";

export const Logo = () => {
  return (
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
              <span className=" bg-accent text-accent-content px-1">
                Filter
              </span>
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
};
