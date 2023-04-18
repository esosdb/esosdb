const fs = require("fs");
const { load } = require("./load");
function deleteData(path, filePath, readable) {
  const pathArray = path.split(".");
  let obj = load(filePath);

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

  try {
    fs.writeFileSync(filePath, JSON.stringify(obj, null, readable));
    return target;
  } catch (e) {
    console.error(e.message);
  }
}

module.exports = { deleteData };
