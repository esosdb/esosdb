const fs = require("fs");
function deleteData(path, allData, filePath, readable) {
  const pathArray = path.split(".");
  let obj = allData;

  let target = obj;
  for (let i = 0; i < pathArray.length - 1; i++) {
    const key = pathArray[i];
    if (!target[key]) {
      return false;
    }
    target = target[key];
  }

  const lastKey = pathArray[pathArray.length - 1];
  if (!target[lastKey]) {
    return false;
  }

  delete target[lastKey];

  fs.writeFileSync(filePath, JSON.stringify(obj, null, readable), (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved to database");
    }
  });

  return target;
}

module.exports = { deleteData };
