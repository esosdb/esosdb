const { getData } = require("../get");

function findById(name, id, db) {
  try {
    return getData(`${id}`, `./${name}`);
  } catch (e) {
    return console.error(e.message);
  }
}
module.exports = { findById };
