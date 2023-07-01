const { getData } = require("../get");

function findData(name, id, db, fis) {
  try {
    return getData(`${name.split("/")[1]}s.${id}`, `./${name}`);
  } catch (e) {
    return (
      console.error(e.message),
      fis.emit("error", {
        type: "error",
        name: name.split("/")[1],
        message: `Not found data with this id : ${id}`,
      })
    );
  }
}
module.exports = { findData };
