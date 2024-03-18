const { load } = require("./load");

function getData(path, filePath) {
  let target = load(filePath);
  var pathArray = path.split(".");
  for (let i = 0; i < pathArray.length; i++) {
    const key = pathArray[i];
    if (!target[key]) {
      return undefined;
    }
    target = target[key];
  }
  return target;
}

module.exports = { getData };
