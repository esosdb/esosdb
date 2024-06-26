const { deleteData } = require("../delete");
const { load } = require("../load");

function deleteById(name, id, db) {
    try {
        let target = load(`./${name}.esos.db`)[id];
        if (!target) throw new Error(`Not found data with this id: ${id}`);
        return deleteData(`${id}`, `./${name}.esos.db`, db.space);
    } catch (e) {
        throw new Error(e);
    }
}

module.exports = { deleteById };
