const { setData } = require("./functions/set");
const fs = require("fs");
const { getData } = require("./functions/get");
const { deleteData } = require("./functions/delete");
const { normalize, dirname } = require("path");
const { load } = require("./functions/load");
const { createData } = require("./functions/Schema/create");
const { deleteById } = require("./functions/Schema/deleteById");
const { findByElement } = require("./functions/Schema/findByElement");
const { updateById } = require("./functions/Schema/updateById");
const { findById } = require("./functions/Schema/findById");
class DatabaseEvents {
  constructor() {
    this.listeners = {};
  }

  on(eventName, listener) {
    if (!this.listeners[eventName]) {
      this.listeners[eventName] = [];
    }
    this.listeners[eventName].push(listener);
  }

  emit(eventName, data) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      eventListeners.forEach((listener) => listener(data));
    }
  }

  off(eventName, listener) {
    const eventListeners = this.listeners[eventName];
    if (eventListeners) {
      this.listeners[eventName] = eventListeners.filter(
        (existingListener) => existingListener !== listener
      );
    }
  }

  clear() {
    this.listeners = {};
  }
}

class AdvancedDatabase {
  name;
  space;
  constructor(props = { name: String, space: Number }) {
    this.name = props.name;
    this.space = props.space;
    if (!fs.existsSync(`./${this.name}`)) {
      try {
        fs.mkdirSync(`./${this.name}`, { recursive: true });
      } catch (err) {
        console.error(err);
      }
    }
    return this;
  }
}

class CreateSchema extends DatabaseEvents {
  connected_to;
  name;
  props;
  timestamps;
  constructor(
    props = {
      connect: String,
      name: String,
      props: String,
      timestamps: Boolean,
    }
  ) {
    super();
    this.connected_to = props.connect;
    this.name = props.name;
    this.props = props.props;
    this.timestamps = props.timestamps;
    if (!fs.existsSync(`./${this.connected_to.name}/${this.name}s.esos.db`)) {
      try {
        fs.writeFileSync(
          `./${this.connected_to.name}/${this.name}s.esos.db`,
          "{}",
          "utf-8"
        );
      } catch (e) {
        console.error(e);
      }

      setTimeout(() => {
        this.emit("ready", {
          type: "ready",
          status: true,
          message: `${this.name.toUpperCase()} database is created`,
        });
        this.off("ready", () => {});
      }, 0);
    } else {
      setTimeout(() => {
        this.emit("ready", {
          type: "ready",
          status: true,
          message: `${this.name.toUpperCase()} database is ready`,
        });
      }, 0);
    }
    return this;
  }

  create(value, callback = () => {}) {
    return callback(
      createData(
        this.connected_to.name + "/" + this.name,
        this.props,
        value,
        this.connected_to,
        this.timestamps,
        this
      )
    );
  }

  deleteById(id, callback = () => {}) {
    return callback(
      deleteById(
        this.connected_to.name + "/" + this.name,
        id,
        this.connected_to,
        this
      )
    );
  }

  findByElement(element, callback = () => {}) {
    return callback(
      findByElement(
        this.connected_to.name + "/" + this.name,
        element,
        this.connected_to
      )
    );
  }

  findById(id, callback = () => {}) {
    return callback(
      findById(this.connected_to.name + "/" + this.name, id, this.connected_to)
    );
  }

  updateById(id, value, callback = () => {}) {
    return callback(
      updateById(
        this.connected_to.name + "/" + this.name,
        id,
        this.props,
        value,
        this.connected_to,
        this.timestamps,
        this
      )
    );
  }
}

class Database {
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
  delete(dataPath, callbacks = () => {}) {
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

module.exports = { Database, AdvancedDatabase, CreateSchema };
