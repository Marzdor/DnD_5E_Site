import React from "react";

const Classes = props => {
  const classElem = [];

  props.classList.map(item => {
    return classElem.push(
      <button onClick={props.handleLinkClick} key={item.name}>
        {item.name}
      </button>
    );
  });
  return <section>{classElem}</section>;
};

export default Classes;
