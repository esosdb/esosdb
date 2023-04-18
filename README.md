# esosdb

## Description

Little database for you as local.(You can create big database)

## Table of contents

- [About](#about)
- [Example Uses](#examples)
  - [set()](#set)
  - [get()](#get)
  - [delete()](#delete)
  - [push()](#push)
  - [unpush()](#unpush)
  - [getAll()](#getAll)
  - [deleteAll()](#deleteAll)

## Badges

[![NPM Downloads](https://img.shields.io/npm/dt/esosdb.svg?style=flat-square)](https://www.npmjs.com/package/esosdb)

## Install

> npm i esosdb

## Setup

CommonJS

```js
const { DataBase } = require("esosdb");
const db = new DataBase({
  path: "./esosdb/db.json", // this is default, can write the what you want
  space: 2, //shold be a number (default:0)
});
```

EsModule

```js
import { DataBase } from "esosdb";
const db = new DataBase({
  path: "./esosdb/db.json", // this is default, can write the what you want
  space: 2, //shold be a number (default:0)
});
```

## Examples

### set

- Set any variable to database

`db.set(path,value,callback)`

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

- Get data from database

`db.get(path)`

Do not have a callback, just use the return data

```js
console.log(db.get("main.name")); //logs the "esosdb"
```

### delete

- Delete data from database

`db.delete(path,callback)`

```js
db.delete("main.version", (callback) => {
  console.log(callback); // logs the {name:"esosdb"} because version is deleted
});
```

### push

- Push an element to array

`db.push(path,element,callback)`

```js
db.push("main.dependencies", "fs", (callback) => {
  console.log(callback); // logs the {name:"esosdb",dependencies:["fs"]}
});
```

### unpush

- Unpush an element from array

`db.unpush(path,element,callback)`

```js
db.unpush("main.dependencies", "fs", (callback) => {
  console.log(callback); // logs the {name:"esosdb"}
});
```

### getAll

- get all data from database

`db.getAll()`

Do not have a callback, just use the return data

```js
console.log(db.getAll()); // logs the {main:{name:"esos"}}
```

### deleteAll

- delete all data from database

`db.deleteAll(callback)`

```js
db.deleteAll((callback) => {
  console.log(callback)// logs the {}
})
```
### esosdb
