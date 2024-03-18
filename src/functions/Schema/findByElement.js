const { getData } = require("../get");
const { load } = require("../load");

function findByElement(name, element, db) {
  try {
    var property = Object.keys(element)[0];
    var value = element[property];
    let allData =
      load(`./${name}s.esos.db`);
    let foundData = [];
    Object.keys(allData).forEach((key) => {
      let dataElement = allData[key];
      if (dataElement[property] === value) {
        foundData.push(dataElement);
      }
    });
    return foundData;
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = { findByElement };
