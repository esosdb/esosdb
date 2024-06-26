const { createData } = require("../functions/Schema/create.js");
const { findByElement } = require("../functions/Schema/findByElement.js");
const { findById } = require("../functions/Schema/findById.js");
const { updateById } = require("../functions/Schema/updateById.js");
const { deleteById } = require("../functions/Schema/deleteById.js");
const fs = require("fs");
class CreateSchema {
    connect;
    _name;
    props;
    timestamps;
    constructor(
        props = {
            connect: Object,
            name: String,
            props: Object,
            timestamps: Boolean,
        }
    ) {
        this.connect = props.connect;
        this._name = props.name;
        this.props = props.props;
        this.timestamps = props.timestamps;
        if (!fs.existsSync(`./${this.connect.name}/${this._name}.esos.db`)) {
            try {
                fs.writeFileSync(
                    `./${this.connect.name}/${this._name}.esos.db`,
                    "{}",
                    "utf-8"
                );
            } catch (e) {
                console.error(e);
            }
        }
        return this;
    }

    create(data, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                createData(
                    this.connect.name + "/" + this._name,
                    this.props,
                    data,
                    this.connect,
                    this.connect.timestamps
                )
            );
        } catch (error) {
            return listener(error, null);
        }
    }

    deleteById(id, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                deleteById(this.connect.name + "/" + this._name, id, this)
            );
        } catch (error) {
            return listener(error, null);
        }
    }

    findById(id, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                findById(this.connect.name + "/" + this._name, id)
            );
        } catch (error) {
            return listener(error, null);
        }
    }

    findByElement(element, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                findByElement(this.connect.name + "/" + this._name, element)
            );
        } catch (error) {
            return listener(error, null);
        }
    }

    updateById(id, data, listener = (err, data) => {}) {
        try {
            return listener(
                null,
                updateById(
                    this.connect.name + "/" + this._name,
                    id,
                    this.props,
                    data,
                    this.connect,
                    this.connect.timestamps
                )
            );
        } catch (error) {
            return listener(error, null);
        }
    }
}

module.exports = { CreateSchema };
