import React from "react";

const classElem = [];
// TODO setup initial load in for class page before class is selected
const Classes = props => {
  const profElem = [];
  const profChoiceElem = [];
  const savingThrowElem = [];
  const classLevelsElem = [];

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
        <div key={props.name + " At Level - " + item.level}>
          <h4 key={"At Level - " + item.level}>{item.level}</h4>
          <h4
            key={
              "At Level - " +
              item.level +
              " ABSB - " +
              item.ability_score_bonuses
            }
          >
            {item.ability_score_bonuses}
          </h4>
          {typeof item.class_specific !== "undefined"
            ? item.class_specific.map(subItem => {
                return (
                  <h4 key={"At Level - " + item.level + " CS - " + subItem}>
                    {subItem}
                  </h4>
                );
              })
            : null}
          {item.features.map(subItem => {
            return (
              <h4 key={"At Level - " + item.level + " F - " + subItem}>
                {subItem}
              </h4>
            );
          })}
          <h4 key={"At Level - " + item.level + " PB - " + item.prof_bonus}>
            {item.prof_bonus}
          </h4>
        </div>
      );
    });
  }

  return (
    <article>
      <header>{classElem}</header>
      <section>
        <h2>{props.name}</h2>
        <div>
          <div>
            <h4>Level</h4>
            <h4>Ablility Score</h4>
            <h4>Class Specific</h4>
            <h4>Features</h4>
            <h4>Proficiencie Bonus</h4>
          </div>
          {classLevelsElem}
        </div>
        {/* TODO Start Equipment */}
        <div>Start Equipment Place Holder</div>
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
      </section>
    </article>
  );
};

export default Classes;
