const { setData } = require("../set");
const { generateUniqueId } = require("../GlobalFunctions/generateUniqueId");
const { load } = require("../load");
function createData(name, props, value, db, timestamps, fis) {
  let id = "";
  let crtProps = props;
  if (crtProps.id) {
    id = value.id;
  } else {
    id = generateUniqueId();
  }
  let target = { id: id };
  let propArr = Object.keys(crtProps);
  for (let i = 0; i < propArr.length; i++) {
    if (typeof value[propArr[i]] !== "boolean") {
      if (crtProps[propArr[i]].required && value[propArr[i]]) {
        if (
          crtProps[propArr[i]].type === typeof value[propArr[i]] ||
          Array.isArray(value[propArr[i]])
        ) {
          target[propArr[i]] = value[propArr[i]];
        } else {
          return console.error(
            `"${propArr[i]}" must be have '${crtProps[propArr[i]].type}' type`
          );
        }
      } else if (!crtProps[propArr[i]].required && value[propArr[i]]) {
        if (
          crtProps[propArr[i]].type === typeof value[propArr[i]] ||
          Array.isArray(value[propArr[i]])
        ) {
          target[propArr[i]] = value[propArr[i]];
        } else {
          return console.error(
            `"${propArr[i]}" must be have '${crtProps[propArr[i]].type}' type`
          );
        }
      } else if (crtProps[propArr[i]].required && !value[propArr[i]]) {
        return console.error(`"${propArr[i]}" has undefined value in "value"`);
      }
    } else {
      target[propArr[i]] = value[propArr[i]];
    }
  }
  if (timestamps) {
    target["updatedAt"] = new Date();
    target["createdAt"] = new Date();
  }
  let lastTarget = load(`./${name}s.esos.db`) || {};
  lastTarget[id] = target;
  return setData(`./${name}s.esos.db`, `${id}`, target, db.space)[id];
}

module.exports = { createData };
