import { Link } from "react-router";

type NavbarItemProps = {
  to: `/${string}`;
  title: string;
  onClick?: () => void;
  isNew?: boolean;
};

export const NavbarItem = ({ to, title, onClick, isNew }: NavbarItemProps) => {
  return (
    <li className="">
      <Link
        to={to}
        onClick={() => {
          // Blur button to close dropdown, but don't prevent navigation
          onClick?.();
        }}
      >
        {title}
        {isNew && <div className="badge badge-primary badge-sm">New</div>}
      </Link>
    </li>
  );
};
