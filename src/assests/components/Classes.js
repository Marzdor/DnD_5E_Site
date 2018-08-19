import React from "react";
//TODO Render Spellcasting level data
const headerElements = [];

const Classes = props => {
  const profElem = [];
  const profChoiceElem = [];
  const savingThrowElem = [];
  const classLevelsElem = [];
  const classEquipmentElem = [];
  const spellCastingElem = [];

  if (props.name.length === 0) {
    for (let key in props.classData) {
      headerElements.push(
        <button onClick={props.handleLinkClick} key={key}>
          {key}
        </button>
      );
    }
  } else {
    // Proficiencie Elements
    props.classData.proficiencies.map(item => {
      return profElem.push(<p key={item}>{item}</p>);
    });
    // Proficiencie Choice Elements
    props.classData.proficiency_choices.map(item => {
      return profChoiceElem.push(
        <p key={item}>{item.replace(/Skill:\s/, "")}</p>
      );
    });
    // Saving Throw Elements
    props.classData.saving_throws.map(item => {
      return savingThrowElem.push(<p key={item}>{item}</p>);
    });
    // Class Level Elements
    //TODO Maybe change this to select level form drop down?
    //TODO ^-and add spell level casting below???
    props.classData.class_levels.map(item => {
      return classLevelsElem.push(
        <div
          className="class-lvl-container-sub"
          key={props.name + " At Level - " + item.level}
        >
          <h4 className="class-lvl-head">{item.level}</h4>
          <h4 className="class-lvl-head">{item.ability_score_bonuses}</h4>
          <div>
            {typeof item.class_specific !== "undefined"
              ? item.class_specific.map(subItem => {
                  return (
                    <h4
                      className="class-lvl-head"
                      key={"At Level - " + item.level + " CS - " + subItem}
                    >
                      {subItem}
                    </h4>
                  );
                })
              : null}
          </div>
          <div>
            {item.features.map(subItem => {
              return (
                <h4
                  className="class-lvl-head"
                  key={"At Level - " + item.level + " F - " + subItem}
                >
                  {subItem}
                </h4>
              );
            })}
          </div>
          <h4 className="class-lvl-head">{item.prof_bonus}</h4>
        </div>
      );
    });
    // Equipment Elements
    for (let key in props.classData.equipment) {
      classEquipmentElem.push(
        <div className="container-sub" key={key}>
          <h4 className="title-sub equip">{key.replace(/_/, " ")}</h4>
          {/choice/.test(key) ? (
            props.classData.equipment[key].map((item, ind) => {
              let htmlElements = [];
              item.forEach(element => {
                htmlElements.push(<p key={element}>{element}</p>);
              });
              return (
                <div key={item + " container"} className="item-grid">
                  {htmlElements}
                  {ind < props.classData.equipment[key].length - 1 ? (
                    <p className="or">"Or Choose 1 of these"</p>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p id="start-equip">
              {props.classData.equipment[key].toString().replace(/,/g, " or ")}
            </p>
          )}
        </div>
      );
    }
    // Spell Casting Elements
    if (props.classData.hasOwnProperty("spellcasting")) {
      props.classData.spellcasting.map((item, index) => {
        if (index === 0) {
          spellCastingElem.push(
            <div key={item}>
              <h4 className="title-sub">Spell Casting Ability</h4>
              <p>{item}</p>
            </div>
          );
        } else {
          item.map(subItem => {
            return spellCastingElem.push(
              <div key={subItem.name}>
                <h4 className="title-sub">{subItem.name}</h4>
                {subItem.desc.map(para => {
                  return <p key={"Desc : " + para.slice(0, 10)}>{para}</p>;
                })}
              </div>
            );
          });
        }
        return true;
      });
    }
  }

  return (
    <article>
      <header>{headerElements}</header>
      <div className="hidden" id="container">
        <h2 id="class">{props.name}</h2>
        {/* Class Level Start */}
        <h3 className="title-main">Class Levels</h3>
        <section id="lvl-head" className="class-lvl-container-sub">
          <h4 className="class-lvl-head">
            <span className="long">Level</span>
            <span className="short">LvL</span>
          </h4>
          <h4 className="class-lvl-head">
            <span className="long">Ability Score</span>
            <span className="short">Abl. Score</span>
          </h4>
          <h4 className="class-lvl-head">Class Specific</h4>
          <h4 className="class-lvl-head">Features</h4>
          <h4 className="class-lvl-head">
            <span className="long">Proficiencie Bonus</span>
            <span className="short">Prof. Bonus</span>
          </h4>
        </section>
        <section id="class-lvl-container">{classLevelsElem}</section>
        {}
        {/* Class Level End */}
        {/* Spell Casting Start */}
        <section id="spellcasting-container">{spellCastingElem}</section>
        {/* Spell Casting End */}
        {/* Equipment Start */}
        <section id="equipment-container">
          <h3 className="title-main">Equipment</h3>
          {classEquipmentElem}
        </section>
        {/* Equipment End */}
        <h3 className="title-main">Hit Dice: {props.classData.hit_die}</h3>
        {/* Proficiencies Start */}
        <section className="container-sub">
          <h3 className="title-main">Proficiencies</h3>
          {profElem}
        </section>
        <section id="prof-choice" className="container-sub">
          <h3 className="title-main">Proficiencie Choices</h3>
          {profChoiceElem}
        </section>
        {/* Proficiencies End */}
        <section className="container-sub">
          <h3 className="title-main">Saving Throws</h3>
          {savingThrowElem}
        </section>
        <section className="container-sub">
          <h3 className="title-main">Sub Classes</h3>
          <p>{props.classData.subclasses}</p>
        </section>
      </div>
    </article>
  );
};

export default Classes;
