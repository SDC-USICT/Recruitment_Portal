"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var env       = process.env.NODE_ENV || "development";

//var config    = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
var Relation = require('./relation');

/* Sequelize settings */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database Connection has been established successfully.');

  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });




var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "relation.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    console.log(model);
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//Relation Assginments
Relation(db);

module.exports = db;
