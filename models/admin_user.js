'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes){
  var admin_User = sequelize.define("adminUser", {

    UserId: {
      type: DataTypes.INTEGER.UNSIGNED.ZEROFILL,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true,
      unique:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull:false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    }
  },{
    tableName: 'adminUser'
  });
return admin_User;
};
