declare class AdvancedDatabase {
    constructor({ name, space = 0 }: { name: string; space?: number });
    createBackup(
        backupFolder: string,
        listener: (err: Error, data: boolean) => any
    ): any;

    createBackup(listener: (err: Error, data: boolean) => any): any;
}

export { AdvancedDatabase };
