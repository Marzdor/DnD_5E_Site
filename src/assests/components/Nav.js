import React from "react";

const Nav = props => {
  return (
    <nav>
      <a onClick={props.handleNavClick} href="#home">
        Home
      </a>
      <a onClick={props.handleNavClick} href="#classes">
        Classes
      </a>
      <a onClick={props.handleNavClick} href="#spells">
        Spells
      </a>
    </nav>
  );
};

export default Nav;
