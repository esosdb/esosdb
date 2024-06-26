const fs = require("fs");
function load(filePath) {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (err) {
        return {};
    }
}

module.exports = { load };
