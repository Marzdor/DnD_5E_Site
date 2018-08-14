import React from "react";

const Nav = props => {
  return (
    <nav>
      <ul>
        <li>
          <a onClick={props.handleNavClick} href="#home">
            Home
          </a>
        </li>
        <li>
          <a onClick={props.handleNavClick} href="#classes">
            Classes
          </a>
        </li>
        <li>
          <a onClick={props.handleNavClick} href="#spells">
            Spells
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
