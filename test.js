var esosdb = require("./module/index");
var db = new esosdb.DataBase({
  path: "./esosdb/db.json",
  space: 3,
});

db.set("module.name", "esosdb", (data) => {
  console.log(data);
});

db.set("module.version", "2.0.1", (data) => {
  console.log(data);
});
