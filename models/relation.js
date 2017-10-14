'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(models){
  console.log("Relations built successfully");
  models.User.hasOne(models.Applicant, { foreignKey: 'ApplicantId' , targetKey: 'UserId', foreignKeyConstraint : true});
  models.Applicant.hasMany(models.candidates_2017, { foreignKey: 'ApplicantId', targetKey: 'ApplicantId', foreignKeyConstraint: true});
  models.vacancy.hasMany(models.candidates_2017, {foreignKey: 'vacancy_id', targetKey: 'vacancy_id'});

};
