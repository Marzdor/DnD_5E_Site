function getBaseClassData(stateClassData, onSuccess) {
  fetch("http://www.dnd5eapi.co/api/classes/")
    .then(res => {
      return res.json();
    })
    .then(data => {
      // Get list of all classes
      let newClassData = stateClassData;
      data.results.map(item => {
        newClassData[item.name] = {};
        return true;
      });
      for (let obj in newClassData) {
        // Get base class data
        let target = "http://www.dnd5eapi.co/api/classes/" + obj.toLowerCase();
        fetch(target)
          .then(res => {
            return res.json();
          })
          .then(data => {
            // Delete keys we don't want/need
            const cleanedData = cleanClassData(data);
            // Cleaning data more and add data to existing object
            for (let key in cleanedData) {
              let prop = [];
              if (cleanedData.hasOwnProperty(key)) {
                switch (key) {
                  case "proficiencies":
                  case "saving_throws":
                    cleanedData[key].map(item => {
                      return prop.push(item.name);
                    });
                    newClassData[obj][key] = prop;
                    break;
                  case "proficiency_choices":
                    cleanedData[key][0].from.map(item => {
                      return prop.push(item.name);
                    });
                    prop = ["Choose: " + cleanedData[key][0].choose, ...prop];
                    newClassData[obj][key] = prop;
                    break;
                  case "subclasses":
                    newClassData[obj][key] = cleanedData[key][0].name;
                    break;
                  //TODO lookin to palidin bug starting at index 5
                  case "spellcasting":
                    fetch(cleanedData[key].url)
                      .then(res => {
                        return res.json();
                      })
                      .then(data => {
                        let cleanedData = cleanSpellCastingData(data);
                        const info = [cleanedData.info];
                        prop = [cleanedData.spellcasting_ability.name, ...info];
                        newClassData[obj][key] = prop;
                      });
                    break;
                  default:
                    newClassData[obj][key] = cleanedData[key];
                }
              }
              newClassData[obj].selectedLevel = 1;
            }
          });
        // Getting class level data
        fetch(target + "/levels")
          .then(res => {
            return res.json();
          })
          .then(data => {
            // Delete keys we don't want/need
            let cleanedData = data.map(item => {
              return cleanLevelData(item);
            });
            // Cleaning data more and add data to existing object
            cleanedData.map(level => {
              for (let key in level) {
                let prop = [];
                switch (key) {
                  case "class_specific":
                    switch (obj) {
                      case "Rogue":
                        level[key].sneak_attack =
                          "Dice Count: " +
                          level[key].sneak_attack.dice_count +
                          " Dice Value: " +
                          level[key].sneak_attack.dice_value;
                        break;
                      case "Monk":
                        level[key].martial_arts =
                          "Dice Count: " +
                          level[key].martial_arts.dice_count +
                          " Dice Value: " +
                          level[key].martial_arts.dice_value;
                        break;
                      case "Sorcerer":
                        //TODO fix sorcerer class specific bug
                        level[key].creating_spell_slots.map(item => {
                          let text = "";
                          for (let key in item) {
                            text +=
                              key.replace(/_/g, " ") + ": " + item[key] + " ";
                          }
                          prop.push(text.replace(/\s$/, ""));
                          console.log(prop);
                          return true;
                        });
                        level[key].creating_spell_slots = prop;

                        break;
                      default:
                        for (let item in level[key]) {
                          prop.push(
                            item.replace(/_/g, " ") + ": " + level[key][item]
                          );
                        }
                    }
                    level[key] = prop;
                    break;
                  case "spellcasting":
                    for (let item in level[key]) {
                      prop.push(
                        item.replace(/_/g, " ") + ": " + level[key][item]
                      );
                    }
                    level[key] = prop;
                    break;
                  case "features":
                    level[key].map(item => {
                      return prop.push(item.name);
                    });
                    level[key] = prop;
                    break;
                  default:
                    key = level[key];
                }
              }
              return true;
            });
            newClassData[obj].class_levels = cleanedData;
          });
      }

      for (let i = 1; i <= 12; i++) {
        // Getting equipment data
        fetch("http://www.dnd5eapi.co/api/startingequipment/" + i)
          .then(res => {
            return res.json();
          })
          .then(data => {
            // Delete keys we don't want/need
            let className = data.class.name;
            let cleanedData = cleanStartEquipData(data);
            newClassData[className].equipment = [];
            // Cleaning data more and add data to existing object
            for (let key in cleanedData) {
              let prop = [];
              const keyRegex = key.match(/choice_\d/);
              if (keyRegex !== null) {
                cleanedData[key].map(item => {
                  return prop.push(
                    item.from.map(subItem => {
                      return subItem.item.name;
                    })
                  );
                });
                cleanedData[key] = prop;
              } else {
                cleanedData[key].map(item => {
                  return prop.push(item.quantity + "x " + item.item.name);
                });
                cleanedData[key] = prop;
              }
              newClassData[className].equipment = cleanedData;
            }
          });
      }

      onSuccess(newClassData, "class");
    });
}

function getBaseSpellList(stateSpellData, onSuccess) {
  fetch("http://www.dnd5eapi.co/api/spells/")
    .then(res => {
      return res.json();
    })
    .then(data => {
      // get list off all spells
      let newSpellData = stateSpellData;
      data = data.results.map(item => {
        return item.name;
      });
      newSpellData = data;

      onSuccess(newSpellData, "spell");
    });
}

async function fetchSpells(i) {
  const response = await fetch("http://www.dnd5eapi.co/api/spells/" + i);
  let data = await response.json();
  data = cleanSpellData(data);
  return data;
}
//TODO Refractor this shit to make it better I already h8te it
function cleanClassData(data) {
  data = commonClean(data);
  delete data.name;
  delete data.class_levels;
  return data;
}
function cleanLevelData(data) {
  data = commonClean(data);
  delete data.feature_choices;
  return data;
}
function cleanStartEquipData(data) {
  data = commonClean(data);
  delete data.choices_to_make;
  return data;
}
function cleanSpellCastingData(data) {
  data = commonClean(data);
  delete data.level;
  return data;
}
function cleanSpellData(data) {
  data = commonClean(data);
  delete data.page;
  delete data.subclasses;
  data.school = data.school.name;
  data.description = data.desc;
  delete data.desc;
  data.classes = data.classes.map(item => {
    return item.name;
  });
  return data;
}
function commonClean(data) {
  delete data.class;
  delete data.index;
  delete data.url;
  delete data._id;
  return data;
}
export { getBaseClassData, getBaseSpellList, fetchSpells };
