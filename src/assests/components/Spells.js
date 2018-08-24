import React from "react";

const Spells = props => {
  const spellList = [];
  const spellElem = [];

  props.spellListFiltered.map(item => {
    return spellList.push(
      <button
        className="header-button"
        onClick={props.handleSpellLinkClick}
        key={item}
      >
        {item}
      </button>
    );
  });

  for (let key in props.spellData) {
    let prop = [];

    if (typeof props.spellData[key] === "object") {
      props.spellData[key].map(item => {
        return prop.push(<p key={item}>{item}</p>);
      });
      spellElem.push(
        <section className={"spells-" + key} key={key}>
          <h3 className="spells-title-sub">{key.replace(/_/, " ")}</h3>
          {prop}
        </section>
      );
    } else {
      if (key === "name") {
        spellElem.push(
          <h2 className={"spells-" + key} key={key}>
            {props.spellData[key]}
          </h2>
        );
      } else {
        prop.push(<p key={props.spellData[key]}>{props.spellData[key]}</p>);
        spellElem.push(
          <section className={"spells-" + key} key={key}>
            <h3 className="spells-title-sub">{key.replace(/_/, " ")}</h3>
            {prop}
          </section>
        );
      }
    }
  }

  return (
    <article className="container">
      <header className="header-spell">
        <input
          className="spells-search"
          onChange={props.handleSearchUpdate}
          type="search"
          placeholder="Search For a Spell Ex. Acid Arrow"
        />
        {spellList}
      </header>
      <div className="container-spell-main">{spellElem}</div>
    </article>
  );
};

export default Spells;
