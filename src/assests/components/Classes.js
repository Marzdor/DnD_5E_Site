import React from "react";

const classElem = [];

const Classes = props => {
  const profElem = [];
  const profChoiceElem = [];
  const savingThrowElem = [];
  if (props.name.length === 0) {
    for (let key in props.classData) {
      classElem.push(
        <button onClick={props.handleLinkClick} key={key}>
          {key}
        </button>
      );
    }
  } else {
    props.classData.proficiencies.map(item => {
      console.log("hit");
      return profElem.push(<h4 key={item}>{item}</h4>);
    });
    props.classData.proficiency_choices.map(item => {
      return profChoiceElem.push(<h4 key={item}>{item}</h4>);
    });
    props.classData.saving_throws.map(item => {
      return savingThrowElem.push(<h4 key={item}>{item}</h4>);
    });
  }
  return (
    <article>
      <header>{classElem}</header>
      <section>
        <h2>{props.name}</h2>
        {/* TODO Class levels */}
        <div>Class Level Place Holder</div>
        {/* TODO Start Equipment */}
        <div>Start Equipment Place Holder</div>
        <h3>Hit Dice: {props.classData.hit_dice}</h3>
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
