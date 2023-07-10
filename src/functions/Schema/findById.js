const { getData } = require("../get");

function findById(name, id, db) {
  try {
    return getData(`${name.split("/")[1]}s.${id}`, `./${name}`);
  } catch (e) {
    return console.error(e.message);
  }
}
module.exports = { findById };
