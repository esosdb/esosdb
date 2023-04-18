const { setData } = require("./functions/set");
const fs = require("fs");
const { getData } = require("./functions/get");
const { deleteData } = require("./functions/delete");
const { normalize, dirname } = require("path");
const { load } = require("./functions/load");
class DataBase {
  dbPath;
  space;
  constructor(
    props = { path: (String = "./esosdb/db.json"), space: (Number = 0) }
  ) {
    this.dbPath = props.path || "./esosdb/db.json";
    this.space = props.space || 0;
    const normalizedPath = normalize(this.dbPath);
    if (!fs.existsSync(normalizedPath)) {
      const dirPath = dirname(normalizedPath);
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        try {
          fs.writeFileSync(normalizedPath, "{}", "utf-8");
        } catch (e) {
          console.log(e);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  set(dataPath, newValue, callbacks = () => {}) {
    return callbacks(setData(this.dbPath, dataPath, newValue, this.space));
  }
  get(dataPath) {
    return getData(dataPath, `./${this.dbPath}`);
  }
  delete(dataPath, callbacks) {
    return callbacks(deleteData(dataPath, this.dbPath, this.space));
  }
  getAll() {
    return load(`./${this.dbPath}`);
  }
  deleteAll(callbacks = () => {}) {
    try {
      fs.writeFileSync(`./${this.dbPath}`, "{}");
      if (this.logtoconsole) {
        console.log("Delete all data");
      }
      return callbacks({});
    } catch (err) {
      console.log(err);
    }
  }
  push(dataPath, element, callbacks = () => {}) {
    let newArray = [];
    if (Array.isArray(getData(dataPath, `./${this.dbPath}`))) {
      newArray = getData(dataPath, `./${this.dbPath}`);
    } else {
      newArray = [];
    }
    newArray.push(element);
    return callbacks(setData(this.dbPath, dataPath, newArray, this.space));
  }
  unpush(dataPath, element, callbacks = () => {}) {
    let newArray = [];
    if (Array.isArray(getData(dataPath, `./${this.dbPath}`))) {
      newArray = getData(dataPath, `./${this.dbPath}`);
    }
    newArray = newArray.filter((value) => value !== element);
    return callbacks(setData(this.dbPath, dataPath, newArray, this.space));
  }
}

module.exports = { DataBase };
