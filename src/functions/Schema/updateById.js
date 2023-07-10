const { getData } = require("../get");
const { setData } = require("../set");

function updateById(name, id, props, value, db, timestamps) {
  let valueArr = Object.keys(value);
  let target = getData(`${id}`, `./${name}s.esos.db`);
  if (!target)
    return (
      console.error(`Not found ${name.split("/")[1]} with "${id}"`)
    );
  for (let i = 0; i < valueArr.length; i++) {
    if (
      props[valueArr[i]].type === typeof value[valueArr[i]] ||
      Array.isArray(value[valueArr[i]])
    ) {
      target[valueArr[i]] = value[valueArr[i]];
    } else {
      return console.error(
        `"${valueArr[i]}" type is not a "${props[valueArr[i]].type}"`
      );
    }
  }
  if (timestamps) {
    target["updatedAt"] = new Date();
  }
  return setData(`./${name}s.esos.db`, `${id}`, target, db.space)[id];
}

module.exports = { updateById };
