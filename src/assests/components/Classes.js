import React from "react";

const headerElements = [];

const Classes = props => {
  const selectedLevel = props.classData.selectedLevel;

  const profElem = [];
  const profChoiceElem = [];
  const savingThrowElem = [];
  const classEquipmentElem = [];
  const spellCastingElem = [];
  const levelSelectElem = [];

  let classLevelsElem;
  let classLevelSpellElm;

  if (props.name.length === 0) {
    // Header Elements
    for (let key in props.classData) {
      headerElements.push(
        <button
          className="header-button"
          onClick={props.handleLinkClick}
          key={key}
        >
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
    props.classData.proficiency_choices.map((item, index) => {
      let element;
      if (index === 0) {
        element = (
          <p className="class-title-choose" key={item}>
            {item.replace(/Skill:\s/, "")}
          </p>
        );
      } else {
        element = <p key={item}>{item.replace(/Skill:\s/, "")}</p>;
      }
      return profChoiceElem.push(element);
    });
    // Saving Throw Elements
    props.classData.saving_throws.map(item => {
      return savingThrowElem.push(<p key={item}>{item}</p>);
    });
    // Class Level Elements
    const levelData = props.classData.class_levels[selectedLevel];
    classLevelsElem = (
      <div className="container-class-level-sub">
        <p className="class-level">{levelData.ability_score_bonuses}</p>
        <div>
          {typeof levelData.class_specific !== "undefined"
            ? levelData.class_specific.map(subItem => {
                return (
                  <p
                    className="class-level"
                    key={"At Level - " + levelData + " CS - " + subItem}
                  >
                    {subItem}
                  </p>
                );
              })
            : null}
        </div>
        <div>
          {levelData.features.map(subItem => {
            return (
              <p
                className="class-level"
                key={"At Level - " + levelData + " F - " + subItem}
              >
                {subItem}
              </p>
            );
          })}
        </div>
        <p className="class-level">{levelData.prof_bonus}</p>
      </div>
    );
    // Spell Level Elements
    if (
      props.classData.class_levels[selectedLevel].hasOwnProperty("spellcasting")
    ) {
      classLevelSpellElm = (
        <div className="container-class-level-sub-spell">
          <h4 className="class-title-spell">Spell Casting</h4>

          {props.classData.class_levels[selectedLevel].spellcasting.map(
            item => {
              return <p key={item}>{item}</p>;
            }
          )}
        </div>
      );
    }
    //Level drop down element
    for (let i = 1; i <= 20; i++) {
      levelSelectElem.push(
        <option value={i} key={"Level: " + i}>
          {i}
        </option>
      );
    }
    // Equipment Elements
    for (let key in props.classData.equipment) {
      classEquipmentElem.push(
        <div className="container-equipment-sub" key={key}>
          <h4 className="class-title-sub">{key.replace(/_/, " ")}</h4>
          {/choice/.test(key) ? (
            props.classData.equipment[key].map((item, ind) => {
              let htmlElements = [];
              item.forEach(element => {
                htmlElements.push(<p key={element}>{element}</p>);
              });
              return (
                <div
                  key={item + " container"}
                  className="container-class-equipment-sub-item"
                >
                  {htmlElements}
                  {ind < props.classData.equipment[key].length - 1 ? (
                    <p className="or">Or Choose 1 of these</p>
                  ) : null}
                </div>
              );
            })
          ) : (
            <p>
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
              <h4 className="class-title-sub">Spell Casting Ability</h4>
              <p>{item}</p>
            </div>
          );
        } else {
          item.map(subItem => {
            return spellCastingElem.push(
              <div key={subItem.name}>
                <h4 className="class-title-sub">{subItem.name}</h4>
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
      <header className="header">{headerElements}</header>
      <div className="hidden container-class-main">
        <h2 className="class-title-name">{props.name}</h2>
        {/* Class Level Start */}
        <h3 className="class-title-main">Class Levels</h3>
        <label className="class-level-label">Selecet A Level : </label>
        <select
          id="level-select"
          defaultValue="1"
          onChange={props.handleLevelChange}
        >
          {levelSelectElem}
        </select>
        <section id="container-class-level">
          <div className="container-class-level-sub">
            <h4>
              <span className="long">Ability Score</span>
              <span className="short">Abl. Score</span>
            </h4>
            <h4>Class Specific</h4>
            <h4>Features</h4>
            <h4>
              <span className="long">Proficiencie Bonus</span>
              <span className="short">Prof. Bonus</span>
            </h4>
          </div>
          {classLevelsElem}
          {classLevelSpellElm}
        </section>
        {/* Class Level End */}
        {/* Spell Casting Start */}
        <section id="container-class-spellcasting">{spellCastingElem}</section>
        {/* Spell Casting End */}
        {/* Equipment Start */}
        <section id="container-class-equipment">
          <h3 className="class-title-main">Equipment</h3>
          {classEquipmentElem}
        </section>
        {/* Equipment End */}
        <h3 className="class-title-main">
          Hit Dice: {props.classData.hit_die}
        </h3>
        {/* Proficiencies Start */}
        <section className="container-class-sub">
          <h3 className="class-title-main">Proficiencies</h3>
          {profElem}
        </section>
        <section id="prof-choice" className="container-class-sub">
          <h3 className="class-title-main">Proficiencie Choices</h3>
          {profChoiceElem}
        </section>
        {/* Proficiencies End */}
        <section className="container-class-sub">
          <h3 className="class-title-main">Saving Throws</h3>
          {savingThrowElem}
        </section>
      </div>
    </article>
  );
};

export default Classes;
