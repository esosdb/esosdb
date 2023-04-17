declare class DataBase {
  constructor<DataBase>({
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

declare interface DataBase {
  path: string;
  space: number;
}

export { DataBase };
