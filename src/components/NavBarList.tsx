import { Link } from "react-router";

type NavBarItemProps = {
  to: `/${string}`;
  title: string;
  onClick?: () => void;
};

export const NavBarItem = ({ to, title, onClick }: NavBarItemProps) => {
  return (
    <li>
      <Link
        to={to}
        onClick={() => {
          // Blur button to close dropdown, but don't prevent navigation
          onClick?.();
        }}
      >
        {title}
      </Link>
    </li>
  );
};
