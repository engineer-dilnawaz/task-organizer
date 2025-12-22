import { Link } from "react-router";

type NavBarItemProps = {
  to: `/${string}`;
  title: string;
};

export const NavBarItem = ({ to, title }: NavBarItemProps) => {
  return (
    <li>
      <Link to={to}>{title}</Link>
    </li>
  );
};
