const { getData } = require("../get");

function findById(name, id) {
    try {
        return getData(`${id}`, `./${name}.esos.db`);
    } catch (e) {
        throw new Error(e.message);
    }
}
module.exports = { findById };
