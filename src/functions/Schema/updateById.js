const { getData } = require("../get");
const { setData } = require("../set");

function updateById(name, id, props, value, db, timestamps) {
    let valueArr = Object.keys(value);
    let target = getData(`${id}`, `./${name}.esos.db`);
    if (!target)
        throw new Error(`Not found ${name.split("/")[1]} with "${id}"`);
    for (let i = 0; i < valueArr.length; i++) {
        if (
            props[valueArr[i]].type === typeof value[valueArr[i]] ||
            Array.isArray(value[valueArr[i]])
        ) {
            target[valueArr[i]] = value[valueArr[i]];
        } else {
            throw new Error(
                `"${valueArr[i]}" type is not a "${props[valueArr[i]].type}"`
            );
        }
    }
    if (timestamps) {
        target["updatedAt"] = new Date();
    }
    return setData(`./${name}.esos.db`, `${id}`, target, db.space)[id];
}

module.exports = { updateById };
