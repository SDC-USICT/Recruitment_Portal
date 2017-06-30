/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vacancy', {
    vacancy_id: {
      type: DataTypes.INTEGER(250),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    designation: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    basis: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    start_date: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    end_date: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    school: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    vacancy_status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    tableName: 'vacancy'
  });
};
