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
      // Get base class data
      for (let obj in newClassData) {
        let target = "http://www.dnd5eapi.co/api/classes/" + obj.toLowerCase();
        fetch(target)
          .then(res => {
            return res.json();
          })
          .then(data => {
            console.log(data);
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
                      prop.push(item.name);
                      return true;
                    });
                    newClassData[obj][key] = prop;
                    break;
                  case "proficiency_choices":
                    cleanedData[key][0].from.map(item => {
                      prop.push(item.name);
                      return true;
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
      }
      onSuccess(newClassData);
    });
}

function cleanClassData(data) {
  delete data.index;
  delete data.name;
  delete data.url;
  delete data._id;
  return data;
}
export { getBaseClassData };
