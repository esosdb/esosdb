const { normalize, dirname } = require("path");
const { setData } = require("../functions/set");
const { getData } = require("../functions/get");
const { deleteData } = require("../functions/delete");
const { load } = require("../functions/load");
const fs = require("fs");

class Database {
    path;
    space;
    constructor(
        options = { path: (String = "./esosdb/db.json"), space: (Number = 0) }
    ) {
        this.path = options.path;
        this.space = options.space;
        const normalizedPath = normalize(this.path);
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

    set(dataPath, newValue, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                setData(this.path, dataPath, newValue, this.space)
            );
        } catch (error) {
            return listener(error, null);
        }
    }
    get(dataPath) {
        try {
            return getData(dataPath, `./${this.path}`);
        } catch (error) {
            return error;
        }
    }

    delete(dataPath, listener = (err, data) => {}) {
        try {
            return listener(null, deleteData(dataPath, this.path, this.space));
        } catch (error) {
            return listener(error, null);
        }
    }

    getAll() {
        return load(`./${this.path}`);
    }

    deleteAll(listener = (err, data) => {}) {
        try {
            fs.writeFileSync(`./${this.path}`, "{}");
            return listener(null, {});
        } catch (error) {
            return listener(error, null);
        }
    }
    push(dataPath, element, listener = (err, data) => {}) {
        try {
            let newArray = [];
            if (Array.isArray(getData(dataPath, `./${this.path}`))) {
                newArray = getData(dataPath, `./${this.path}`);
            } else {
                newArray = [];
            }
            newArray.push(element);
            return listener(
                null,
                setData(this.path, dataPath, newArray, this.space)
            );
        } catch (error) {
            return listener(error, null);
        }
    }

    unpush(dataPath, element, listener = (err, data) => {}) {
        try {
            let newArray = [];
            if (Array.isArray(getData(dataPath, `./${this.path}`))) {
                newArray = getData(dataPath, `./${this.path}`);
            }
            newArray = newArray.filter((value) => value !== element);
            return listener(
                null,
                setData(this.path, dataPath, newArray, this.space)
            );
        } catch (error) {
            return listener(error, null);
        }
    }
}

module.exports = { Database };
