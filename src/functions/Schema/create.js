const { setData } = require("../set");
const { generateUniqueId } = require("../GlobalFunctions/generateUniqueId");
const { load } = require("../load");

function createData(name, props, value, db, timestamps) {
    let id = "";
    let crtProps = props;

    if (crtProps.id) {
        id = value.id;
    } else {
        id = generateUniqueId();
    }

    function processProps(crtProps, value) {
        let target = {};
        let propArr = Object.keys(crtProps);

        for (let i = 0; i < propArr.length; i++) {
            let propName = propArr[i];
            let propDef = crtProps[propName];
            let propValue = value[propName];

            if (propDef.type === "object" && propDef.props) {
                if (propDef.required && !propValue) {
                    throw new Error(
                        `"${propName}" is required but not provided.`
                    );
                }
                target[propName] = processProps(propDef.props, propValue || {});
            } else if (typeof propValue !== "boolean") {
                if (propDef.required && propValue !== undefined) {
                    if (
                        typeof propValue === propDef.type ||
                        (Array.isArray(propValue) &&
                            propDef.type.endsWith("[]"))
                    ) {
                        target[propName] = propValue;
                    } else {
                        throw new Error(
                            `"${propName}" must be of type '${propDef.type}'`
                        );
                    }
                } else if (!propDef.required && propValue !== undefined) {
                    if (
                        typeof propValue === propDef.type ||
                        (Array.isArray(propValue) &&
                            propDef.type.endsWith("[]"))
                    ) {
                        target[propName] = propValue;
                    } else {
                        throw new Error(
                            `"${propName}" must be of type '${propDef.type}'`
                        );
                    }
                } else if (propDef.required && propValue === undefined) {
                    if (propDef.default !== undefined) {
                        if (
                            typeof propDef.default === propDef.type ||
                            (Array.isArray(propDef.default) &&
                                propDef.type.endsWith("[]"))
                        ) {
                            target[propName] = propDef.default;
                        } else {
                            throw new Error(
                                `"${propName}" must be of type '${propDef.type}'`
                            );
                        }
                    } else {
                        throw new Error(
                            propDef.error
                                ? propDef.error.replace("{}", propName)
                                : `"${propName}" has undefined value in "value"`
                        );
                    }
                }
            } else {
                target[propName] = propValue;
            }
        }

        return target;
    }

    let target = { id: id };
    target = { ...target, ...processProps(crtProps, value) };

    if (timestamps) {
        target["updatedAt"] = new Date();
        target["createdAt"] = new Date();
    }

    let lastTarget = load(`./${name}.esos.db`) || {};
    lastTarget[id] = target;

    return setData(`./${name}.esos.db`, `${id}`, target, db.space)[id];
}

module.exports = { createData };
