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
      allowNull: false,
      defaultValue: 1  //1 means open, 0 means vacancy closed
    },

      FirstName: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      LastName: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      FHFirstName: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      FHLastName: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Discipline: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      AadharId: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      DOB: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      CAddress: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      PAddress: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MNumber: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      LLNumber: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Email: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Gender: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Marital: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Nationality: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Category: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Religion: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Minority: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XB: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XY: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XD: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XP: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      XS: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XIIB: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XIIY: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XIID: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      XIIP: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      XIIS: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      GYear: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      GRoll: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MB: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MY: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MD: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MP: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      MS: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      PB: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      PY: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      EmpAddress: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      PD: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      PT: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      TID: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      FOS: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      Image: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },

      Age: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },




      Reference1: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Reference2: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Reference1_Address: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      Reference2_Address: {
          type: DataTypes.INTEGER(1),
          allowNull: false,
          defaultValue: 1
      },
      extradetail: {
          type: DataTypes.INTEGER(1),
          allowNull: true,
          defaultValue: 1
      }
  }, {
    tableName: 'vacancy'
  });
};
