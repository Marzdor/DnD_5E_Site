import React from "react";

const classElem = [];
// TODO setup initial load in for class page before class is selected
// TODO add spell casting
const Classes = props => {
  const profElem = [];
  const profChoiceElem = [];
  const savingThrowElem = [];
  const classLevelsElem = [];
  const classEquipment = [];

  if (props.name.length === 0) {
    for (let key in props.classData) {
      classElem.push(
        <button onClick={props.handleLinkClick} key={key}>
          {key}
        </button>
      );
    }
  } else {
    // Proficiencie Elements
    props.classData.proficiencies.map(item => {
      return profElem.push(<h4 key={item}>{item}</h4>);
    });
    // Proficiencie Choice Elements
    props.classData.proficiency_choices.map(item => {
      return profChoiceElem.push(<h4 key={item}>{item}</h4>);
    });
    // Saving Throw Elements
    props.classData.saving_throws.map(item => {
      return savingThrowElem.push(<h4 key={item}>{item}</h4>);
    });
    // Class Level Elements
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
      classEquipment.push(
        <div className="equipment-container-sub" key={key}>
          <h4 className="title-sub equip">{key.replace(/_/, " ")}</h4>
          {/choice/.test(key) ? (
            props.classData.equipment[key].map((item, ind) => {
              let htmlElements = [];
              item.forEach(element => {
                htmlElements.push(<span>{element}</span>);
              });
              console.log(ind + " " + props.classData.equipment[key].length);
              return (
                <div className="item-grid">
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
  }

  return (
    <article>
      <header>{classElem}</header>
      <section id="container">
        <h2 id="class">{props.name}</h2>
        <h3 className="title-main">Class Levels</h3>
        <div id="lvl-head" className="class-lvl-container-sub">
          <h4 className="class-lvl-head">
            <span className="long">Level</span>
            <span className="short">LvL</span>
          </h4>
          <h4 className="class-lvl-head">
            <span className="long">Ablility Score</span>
            <span className="short">Abl. Score</span>
          </h4>
          <h4 className="class-lvl-head">Class Specific</h4>
          <h4 className="class-lvl-head">Features</h4>
          <h4 className="class-lvl-head">
            <span className="long">Proficiencie Bonus</span>
            <span className="short">Prof. Bonus</span>
          </h4>
        </div>
        <div id="class-lvl-container">{classLevelsElem}</div>
        <div id="equipment-container">
          <h3 className="title-main">Equipment</h3>
          {classEquipment}
        </div>
        <h3>Hit Dice: {props.classData.hit_die}</h3>
        <div>
          <h3>Proficiencies</h3>
          {profElem}
        </div>
        <div>
          <h3>Proficiencie Choices</h3>
          {profChoiceElem}
        </div>
        <div>
          <h3>Saving Throws</h3>
          {savingThrowElem}
        </div>
        <div>
          <h3>Sub Classes</h3>
          <p>{props.classData.subclasses}</p>
        </div>
      </section>
    </article>
  );
};

export default Classes;
