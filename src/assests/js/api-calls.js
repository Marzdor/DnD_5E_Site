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
                  default:
                    newClassData[obj][key] = cleanedData[key];
                }
              }
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
                  // TODO Fix Rouge/Monk data to not show obj for class_specific
                  case "class_specific":
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
      // Getting equipment data
      for (let i = 1; i <= 12; i++) {
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
                prop.map((item, i) => {
                  if (item.length > 2) {
                    item.unshift("Select 1 Of These ;");
                  }
                  return (prop[i] = item.toString().replace(/,/g, ";"));
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
      onSuccess(newClassData);
    });
}

function cleanClassData(data) {
  delete data.index;
  delete data.name;
  delete data.url;
  delete data._id;
  delete data.class_levels;
  return data;
}
function cleanLevelData(data) {
  delete data.index;
  delete data.class;
  delete data.url;
  delete data._id;
  delete data.feature_choices;
  return data;
}
function cleanStartEquipData(data) {
  delete data.class;
  delete data.index;
  delete data.url;
  delete data._id;
  delete data.choices_to_make;
  return data;
}
export { getBaseClassData };
