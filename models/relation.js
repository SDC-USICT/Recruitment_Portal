'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(models){
  console.log("Relations are biuld successfully");
  models.User.hasOne(models.Applicant);
  models.vacancy.hasMany(models.candidates_2017);
  models.Applicant.hasMany(models.candidates_2017);


};
