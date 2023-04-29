# esosdb

## Description

You can easily create a database locally.

Do you want more detail? Check [Docs](https://esosdb.mbps.tk/)

## Badges

[![NPM Downloads](https://img.shields.io/npm/dt/esosdb.svg?style=flat-square)](https://www.npmjs.com/package/esosdb)

## Install

> npm i esosdb

## Setup

CommonJS

```js
const { Database } = require("esosdb");
const db = new Database({
  path: "./esosdb/db.json", // this is default, can write the what you want
  space: 2, //should be a number (default:0)
});
```

EsModule

```js
import { Database } from "esosdb";
const db = new Database({
  path: "./esosdb/db.json", // this is default, can write the what you want
  space: 2, //should be a number (default:0)
});
```

## Examples

### set

```js
db.set("main", {}, (callback) => {
  console.log(callback); // logs the {main:{}}
});

db.set("main.name", "esosdb", (callback) => {
  console.log(callback); // logs the {name:"esosdb"}
});

db.set("main.version", "2.1.0", (callback) => {
  console.log(callback); // logs the {name:"esosdb",version:"2.1.0"}
});
```

### get

```js
console.log(db.get("main.name")); //logs the "esosdb"
```

### delete

```js
db.delete("main.version", (callback) => {
  console.log(callback); // logs the {name:"esosdb"} because version is deleted
});
```

### push

```js
db.push("main.dependencies", "fs", (callback) => {
  console.log(callback); // logs the {name:"esosdb",dependencies:["fs"]}
});
```

### unpush

```js
db.unpush("main.dependencies", "fs", (callback) => {
  console.log(callback); // logs the {name:"esosdb"}
});
```

### getAll

```js
console.log(db.getAll()); // logs the {main:{name:"esos"}}
```

### deleteAll

```js
db.deleteAll((callback) => {
  console.log(callback); // logs the {}
});
```

### esosdb
