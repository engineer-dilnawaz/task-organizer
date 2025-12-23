import { useRef } from "react";

import { Logo } from "./Logo";
import { NavbarList } from "./NavBarList";
import { ThemeSwitch } from "./ThemeSwitch";
import { NavbarTrigger } from "./NavbarTrigger";

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
          <NavbarTrigger onTriggerClick={handleButtonClick} />
          <NavbarList onLinkClick={handleLinkClick} />
        </div>
      </div>
      <Logo />
      <div className="navbar-end">
        <ThemeSwitch />
      </div>
    </div>
  );
}
