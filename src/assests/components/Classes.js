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
    <article>
      <header>{classElem}</header>
      <section>
        <h2>{props.name}</h2>
      </section>
    </article>
  );
};

export default Classes;
