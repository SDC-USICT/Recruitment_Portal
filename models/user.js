'use strict';
module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
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
    },
    confirm_password: {
      type: DataTypes.STRING.BINARY,
      allowNull:false
    }
    // },
    // random: {
    //   type: DataTypes.STRING.BINARY,
    //   allowNull:false
    // },
    // verification: {
    //   type: DataTypes.STRING.BINARY,
    //   allowNull:false
    // }

  },{
    tableName: 'user'
  });

return User;
};
