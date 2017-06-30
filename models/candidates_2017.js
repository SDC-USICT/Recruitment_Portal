/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('candidates_2017', {
    transaction_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    vacancy_id: {
      type: DataTypes.INTEGER(250),
      allowNull: false
    },
    AadharId: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Image: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    TID: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Discipline: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    FirstName: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    LastName: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    Age: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    CAddress: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    PAddress: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    MNumber: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    LLNumber: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    Email: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    DOB: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    FHFirstName: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    FHLastName: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    Gender: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Marital: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    Nationality: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Religion: {
      type: DataTypes.CHAR(25),
      allowNull: true
    },
    Minority: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    Category: {
      type: DataTypes.CHAR(10),
      allowNull: true
    },
    EmpAddress: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    XP: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    XB: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    XY: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    XS: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    XD: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    XIIP: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    XIIB: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    XIIY: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    XIIS: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    XIID: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    MP: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    MB: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    MY: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    MS: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    MD: {
      type: DataTypes.CHAR(5),
      allowNull: true
    },
    PB: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    PY: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    PD: {
      type: DataTypes.CHAR(50),
      allowNull: true
    },
    PT: {
      type: DataTypes.CHAR(250),
      allowNull: true
    },
    FOS: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    GRoll: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    GYear: {
      type: DataTypes.CHAR(100),
      allowNull: true
    },
    Reference1: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    Reference2: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    Reference1_Address: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    Reference2_Address: {
      type: DataTypes.CHAR(255),
      allowNull: true
    },
    extradetail: {
      type: DataTypes.STRING(10000),
      allowNull: true
    },
    candidate_id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    id: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'candidates_2017'
  });
};
