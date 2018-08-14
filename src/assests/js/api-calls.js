function getBaseClassData(stateClassData, onSuccess) {
  fetch("http://www.dnd5eapi.co/api/classes/")
    .then(res => {
      return res.json();
    })
    .then(data => {
      // Get list of all classes
      let newClassData = stateClassData;
      data.results.map(item => {
        newClassData.push({ name: item.name });
        return true;
      });
      ////////////////////////////////////////////
      // Get base class data
      for (let i = 1; i < newClassData.length; i++) {
        let target = "http://www.dnd5eapi.co/api/classes/" + i;
        fetch(target)
          .then(res => {
            return res.json();
          })
          .then(data => {
            // Delete keys we don't want/need
            const cleanedData = cleanClassData(data);
            // Clean data more and add data to existing object
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
                    newClassData[i - 1][key] = prop;
                    break;
                  case "proficiency_choices":
                    cleanedData[key][0].from.map(item => {
                      prop.push(item.name);
                      return true;
                    });
                    prop = ["Choose: " + cleanedData[key][0].choose, ...prop];
                    newClassData[i - 1][key] = prop;
                    break;
                  case "subclasses":
                    newClassData[i - 1][key] = cleanedData[key][0].name;
                    break;
                  default:
                    newClassData[i - 1][key] = cleanedData[key];
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
