'use strict';
module.exports = function(sequelize, DataTypes){
  var Login = sequelize.define("Login", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    pwd: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    },
    verification: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    }

  },{
    tableName: 'login'
  });

return Login;
};
