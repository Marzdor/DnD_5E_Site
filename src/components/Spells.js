import React from "react";

const Spells = props => {
  const spellElem = [];

  props.spellList.map(item => {
    return spellElem.push(
      <button onClick={props.handleLinkClick} key={item}>
        {item}
      </button>
    );
  });
  return <section>{spellElem}</section>;
};

export default Spells;
