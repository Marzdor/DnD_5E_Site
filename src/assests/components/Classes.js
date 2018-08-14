import React from "react";

const Classes = props => {
  const classElem = [];

  props.classData.map(item => {
    return classElem.push(
      <button onClick={props.handleLinkClick} key={item.name}>
        {item.name}
      </button>
    );
  });
  return (
    <section>
      <div>{classElem}</div>
      <div>
        <h2>{props.name}</h2>
      </div>
    </section>
  );
};

export default Classes;
