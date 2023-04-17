import { DataBase } from "./module/index";
const db: DataBase = new DataBase({
  path: "./esosdb/db.json",
  space: 3,
});

db.set("module.name", "esosdb", (data: any) => {
  console.log(data);
});

db.set("module.version", "2.1.0", (data: any) => {
  console.log(data);
});
