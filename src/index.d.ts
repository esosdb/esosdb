declare class Database {
  constructor<Database>({
    path: string = "./esosdb/db.json",
    space: number = 0,
  } = {});
  set(path: string, value: any, callbacks?: (data: any) => any): any;
  get(path: string): any;
  delete(path: string, callbacks?: (data: any) => any): any;
  getAll(): any;
  deleteAll(callbacks?: (data: any) => any): any;
  push(path: string, element: any, callbacks?: (data: any) => any): any;
  unpush(path: string, element: any, callbacks?: (data: any) => any): any;
}

declare interface Database {
  path?: string;
  space?: number;
}

declare type AdvecedDatabase = {
  name: string;
  space?: number;
};

declare class AdvancedDatabase {
  constructor<AdvancedDatabase>({ name: string, space: number = 0 });
}

declare interface AdvancedDatabase {
  name: string;
  space?: number;
}

declare class DatabaseEvents {
  constructor();
  on(eventName: "ready", listener: any): void;
}

declare type Types = {
  string: string;
  number: number;
  "any[]": any[];
  object: object;
  "string[]": string[];
  "number[]": number[];
  boolean: boolean;
};

declare type SchemaProps<T extends keyof Types> = {
  [key: string]: { type: T; required?: boolean };
};

declare class CreateSchema<
  T extends SchemaProps<keyof Types>
> extends DatabaseEvents {
  constructor(skills: {
    connect: any;
    name: string;
    props: T;
    timestamps?: boolean;
  }): any;
  create(
    value: {
      [key in keyof T]-?: T[key]["required"] extends true
        ? T[key]["type"] extends keyof Types
          ? Types[T[key]["type"]]
          : any
        : T[key]["type"] extends keyof Types
        ? Types[T[key]["type"]] | undefined
        : () => { return(any = undefined) };
    },
    callback?: (data: any) => any
  ): any;
  deleteById(id: string, callback?: (data: any) => any): any;
  findByElement(element: any, callback?: (data: any) => any): any;
  updateById(id: string, value: any, callback?: (data: any) => any): any;
  findById(id: string, callback?: (data: any) => any): any;
}

export { Database, AdvancedDatabase, CreateSchema, SchemaProps, Types };
