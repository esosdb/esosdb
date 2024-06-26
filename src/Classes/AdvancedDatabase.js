const fs = require("fs");
class AdvancedDatabase {
    name;
    space;
    listeners;
    constructor(props = { name: (String = "esosdb"), space: (Number = 0) }) {
        this.name = props.name;
        this.space = props.space;
        if (!fs.existsSync(`./${this.name}`)) {
            try {
                fs.mkdirSync(`./${this.name}`, { recursive: true });
            } catch (err) {
                console.error(err);
            }
        }
        this.listeners = {};
        return this;
    }

    /**
     * @param {String|Function} backupFolder
     * @param {Function} listener
     */
    createBackup(backupFolder, listener = (err, data) => {}) {
        try {
            for (let file of fs.readdirSync(`./${this.name}`)) {
                let newFileName = file.split(".")[0] + ".esos.backup.db";
                let newDate = new Date();
                let backupFolderPath;
                let backupFilePath;
                if (typeof backupFolder === "function") {
                    backupFolderPath = `./backup_${
                        newDate.getDate() +
                        "_" +
                        (newDate.getMonth() + 1) +
                        "_" +
                        newDate.getFullYear()
                    }_of_${String(this.name).toUpperCase()}`;
                } else {
                    backupFolderPath = `./${backupFolder}`;
                }
                backupFilePath = `${backupFolderPath}/${newFileName}`;
                if (!fs.existsSync(backupFilePath)) {
                    if (!fs.existsSync(backupFolderPath)) {
                        fs.mkdirSync(backupFolderPath, { recursive: true });
                    }
                    fs.writeFileSync(backupFilePath, "{}", "utf-8");
                }

                fs.copyFileSync(`./${this.name}/${file}`, backupFilePath);
                if (typeof backupFolder === "function") {
                    return backupFolder(null, true);
                } else {
                    return listener(null, backupFilePath);
                }
            }
        } catch (err) {
            if (typeof backupFolder === "function") {
                return backupFolder(err, null);
            } else {
                return listener(err, null);
            }
        }
    }
}

module.exports = { AdvancedDatabase };
