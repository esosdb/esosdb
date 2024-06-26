# esosdb

## Description

You can easily create a database locally.

More details in the [Docs](https://esosdb.itsram.co/)

## Contents

- [Setup classic Database](#setup-classic-database)
  - [set()](#set)
  - [get()](#get)
  - [delete()](#delete)
  - [push()](#push)
  - [unpush()](#deletebyid)
  - [getAll()](#getall)
  - [deleteAll()](#deleteall)
- [Setup advanced Database](#setup-advanced-database)
  - [create()](#create)
  - [deleteById()](#deleteById)
  - [findByElement()](#findByElement)
  - [findById()](#findById)
  - [updateById()](#updateById)

## Badges

[![NPM Downloads](https://img.shields.io/npm/dt/esosdb.svg?style=flat-square)](https://www.npmjs.com/package/esosdb)

## Install

> npm i esosdb

## Setup Classic Database

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
db.set("main", {}, (err,data) => {
  console.log(data); // logs the {main:{}}
});

db.set("main.name", "esosdb", (err,data) => {
  console.log(data); // logs the {name:"esosdb"}
});

db.set("main.version", "2.1.0", (err,data) => {
  console.log(data); // logs the {name:"esosdb",version:"2.1.0"}
});
```

### get

```js
console.log(db.get("main.name")); //logs the "esosdb"
```

### delete

```js
db.delete("main.version", (err,data) => {
  console.log(data); // logs the {name:"esosdb"} because version is deleted
});
```

### push

```js
db.push("main.dependencies", "fs", (err,data) => {
  console.log(data); // logs the {name:"esosdb",dependencies:["fs"]}
});
```

### unpush

```js
db.unpush("main.dependencies", "fs", (err,data) => {
  console.log(data); // logs the {name:"esosdb",dependencies:[]}
});
```

### getAll

```js
console.log(db.getAll()); // logs the {main:{name:"esos"}}
```

### deleteAll

```js
db.deleteAll((err,data) => {
  console.log(data); // logs the {}
});
```

## Setup Advanced Database

CommonJS

```js
const { AdvancedDatabase, CreateSchema } = require("esosdb");
const adb = new AdvancedDatabase({ name: "advanceddb", space: 2 });
const ExampleSchema = new CreateSchema({
  connect: adb,
  name: "example",
  props: { 
    name: { 
        type: "string", 
        required: true,
    } 
  }, //if you don't add any id then id will be generated randomly
  timestamps: true,
});
```

EsModule

```js
import { AdvancedDatabase, CreateSchema } from "esosdb";
const adb = new AdvancedDatabase({ name: "advanceddb", space: 2 });
const ExampleSchema = new CreateSchema({
  connect: adb,
  name: "example",
  props: { 
    name: { 
        type: "string", 
        required: true,
    } 
  }, //if you don't add any id then id will be generated randomly
  timestamps: true,
});
```

### create

```js
ExampleSchema.create({ name: "example" }, (err,data) => {
  console.log(data);
  /*
   {
      id:"uniqueId",
      name:"example",
      updatedAt: "1970-01-01T00:00:00.000Z",
      createdAt: "1970-01-01T00:00:00.000Z"
   }
   */
});
```

### deleteById

```js
ExampleSchema.deleteById("id", (err,data) => {
  console.log(data); // {}
});
```

### findByElement

```js
ExampleSchema.findByElement({ name: "example" }, (err,data) => {
  console.log(data); //[...foundDatas]
});
```

### findById

```js
ExampleSchema.findById("uniqueId", (err,data) => {
  console.log(data);
  /*
  {
    name:"Example",
    //... 
  }
  */
});
```

### updateById

```js
ExampleSchema.updateById("id", { name: "example in the end" }, (err,data) => {
  console.log(data);
  /*
  //changes
  {
    name:"example in the end",
    updatedAt:"last edited time"
  }
  */
});
```