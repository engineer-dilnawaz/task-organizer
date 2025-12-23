import { navbarList } from "../constants/navbar";
import { NavbarItem } from "./NavbarItem";

type NavbarListProps = {
  onLinkClick: () => void;
};

export const NavbarList = ({ onLinkClick }: NavbarListProps) => {
  return (
    <ul
      tabIndex={-1}
      className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
    >
      {navbarList.map((navbarItem) => (
        <NavbarItem
          key={navbarItem.to}
          to={navbarItem.to}
          title={navbarItem.title}
          onClick={onLinkClick}
          isNew={navbarItem?.isNew ?? false}
        />
      ))}
    </ul>
  );
};
