import React from "react";

const Spells = props => {
  const spellElem = [];

  props.spellList.map(item => {
    return spellElem.push(
      <button onClick={props.handleLinkClick} key={item.name}>
        {item.name}
      </button>
    );
  });
  return (
    <article>
      <header>{spellElem}</header>
      <section>
        <h2>{props.name}</h2>
      </section>
    </article>
  );
};

export default Spells;
