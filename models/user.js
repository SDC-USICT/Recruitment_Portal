'use strict';
var bcrypt = require('bcrypt-nodejs');
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {

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
      allowNull:false
    },
    password: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    },
    role:{
      type: DataTypes.STRING.BINARY,
      enum: ['STUDENT', 'ADMIN', 'USER'],
      defaultValue: 'USER'
    }
  },{
    tableName: 'user'
  });


return User;
};
