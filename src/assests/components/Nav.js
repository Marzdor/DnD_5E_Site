import React from "react";

const Nav = props => {
  return (
    <nav className="nav">
      <a className="nav-link" onClick={props.handleNavClick} href="#home">
        Home
      </a>
      <a className="nav-link" onClick={props.handleNavClick} href="#classes">
        Classes
      </a>
      <a className="nav-link" onClick={props.handleNavClick} href="#spells">
        Spells
      </a>
    </nav>
  );
};

export default Nav;
