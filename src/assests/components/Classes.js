import React from "react";

const Classes = props => {
  const classElem = [];

  for (let key in props.classData) {
    classElem.push(
      <button onClick={props.handleLinkClick} key={key}>
        {key}
      </button>
    );
  }
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
