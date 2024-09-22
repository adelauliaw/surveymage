'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Survey extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Survey.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  Survey.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'UserId is required'
        },
        notEmpty: {
          msg: 'UserId is required'
        }
      }
    },
    questions: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Questions is required'
        },
        notEmpty: {
          msg: 'Questions is required'
        }
      }
    },
    type:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Type is required'
        },
        notEmpty: {
          msg: 'Type is required'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Survey',
  });
  return Survey;
};