const fs = require("fs");
function setData(filePath, path, value, allData, readable) {
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
  fs.writeFileSync(filePath, JSON.stringify(allData, null, readable), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved to database");
    }
  });
  return target;
}

module.exports = { setData };
