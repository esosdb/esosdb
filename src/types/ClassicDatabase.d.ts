declare class Database {
    constructor({ path, space = 0 }: { path: string; space?: number });
    set(path: string, value: any, listener?: (err?: Error, data: any) => any);
    get(path: string);
    delete(path: string, listener?: (err?: Error, data: any) => any);
    getAll();
    deleteAll(listener?: (err?: Error, data: any) => any);
    push(path: string, value: any, listener?: (err?: Error, data: any) => any);
    unpush(
        path: string,
        value: any,
        listener?: (err?: Error, data: any) => any
    );
}

export { Database };
