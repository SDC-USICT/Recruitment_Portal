/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vacancy', {
    vacancy_id: {
      type: DataTypes.INTEGER(20),
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
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: DataTypes.NOW
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
