const { setData } = require("./functions/set");
const fs = require("fs");
const { getData } = require("./functions/get");
const { deleteData } = require("./functions/delete");
class DataBase {
  dbPath;
  logtoconsole;
  allData;
  readable;
  constructor(props = { path: String, space: Number }) {
    this.dbPath = props.path || "./esosdb/db.json";
    this.readable = props.space || 0;
    if (fs.existsSync(this.dbPath) === false) {
      fs.writeFileSync(this.dbPath, "{}");
      return;
    }
  }
  set(dataPath, newValue, callbacks) {
    var allData = fs.readFileSync(`./${this.dbPath}`, "utf-8");
    return callbacks(
      setData(
        this.dbPath,
        dataPath,
        newValue,
        JSON.parse(allData),
        this.readable
      )
    );
  }
  get(dataPath) {
    var allData = fs.readFileSync(`./${this.dbPath}`, "utf-8");
    return getData(dataPath, `./${this.dbPath}`);
  }
  delete(dataPath, callbacks) {
    var allData = fs.readFileSync(`./${this.dbPath}`, "utf-8");
    return callbacks(
      deleteData(dataPath, JSON.parse(allData), this.dbPath, this.readable)
    );
  }
  getAll() {
    return load(`./${this.dbPath}`);
  }
  deleteAll(callbacks) {
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
  push(dataPath, element, callbacks) {
    var allData = fs.readFileSync(`./${this.dbPath}`, "utf-8");
    let newArray = [];
    if (Array.isArray(getData(dataPath, `./${this.dbPath}`))) {
      newArray = getData(dataPath, `./${this.dbPath}`);
    } else {
      newArray = [];
    }
    newArray.push(element);
    return callbacks(
      setData(
        this.dbPath,
        dataPath,
        newArray,
        JSON.parse(allData),
        this.readable
      )
    );
  }
  unpush(dataPath, element, callbacks) {
    var allData = fs.readFileSync(`./${this.dbPath}`, "utf-8");
    let newArray = [];
    if (Array.isArray(getData(dataPath, `./${this.dbPath}`))) {
      newArray = getData(dataPath, `./${this.dbPath}`);
    }
    newArray = newArray.filter((value) => value !== element);
    return callbacks(
      setData(
        this.dbPath,
        dataPath,
        newArray,
        JSON.parse(allData),
        this.readable
      )
    );
  }
}

module.exports = { DataBase };
