const fs = require("fs");
const { load } = require("./load");
function setData(filePath, path, value, readable) {
  let allData = load(filePath);
  let target = allData;
  var pathArray = path.split(".");
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!target[key]) {
      target[key] = {};
    }
    target = target[key];
  }
  target[pathArray[pathArray.length - 1]] = value;

  try {
    fs.writeFileSync(filePath, JSON.stringify(allData, null, readable));
    return target;
  } catch (e) {
    console.error(e);
  }
}

module.exports = { setData };
