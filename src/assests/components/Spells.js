import React from "react";

const Spells = props => {
  const spellElem = [];

  props.spellListFiltered.map(item => {
    return spellElem.push(
      <button
        className="header-button"
        onClick={props.handleSpellLinkClick}
        key={item}
      >
        {item}
      </button>
    );
  });
  return (
    <article>
      <header className="header-spell">
        <input
          className="spells-search"
          onChange={props.handleSearchUpdate}
          type="search"
          placeholder="Search For a Spell Ex. Acid Arrow"
        />
        {spellElem}
      </header>
      <section>
        <h2>{props.name}</h2>
      </section>
    </article>
  );
};

export default Spells;
