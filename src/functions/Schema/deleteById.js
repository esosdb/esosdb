const { deleteData } = require("../delete");
const { getData } = require("../get");
const { load } = require("../load");
const { setData } = require("../set");

function deleteById(name, id, db, fis) {
  try {
    let target = load(`./${name}s.esos.db`)[id];
    if (!target)
      return {
        type: "error",
        message: `Not found data with this id: ${id}`,
      };
    return deleteData(`${id}`, `./${name}s.esos.db`, db.space);
  } catch (e) {
    console.error(e);
  }
}

module.exports = { deleteById };
