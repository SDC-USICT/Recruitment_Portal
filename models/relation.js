'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(models){
  console.log("Relations are biuld successfully");
  models.User.hasOne(models.Applicant, { foreignKey: 'ApplicantId' , targetKey: 'UserId', foreignKeyContraint : true});
  models.Applicant.hasMany(models.candidates_2017);
  models.vacancy.hasMany(models.candidates_2017);
};
