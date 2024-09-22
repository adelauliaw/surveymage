'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Answer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Answer.belongsTo(models.Survey, { foreignKey: 'surveyId' })
    }
  }
  Answer.init({
    surveyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'SurveyId is required'
        },
        notEmpty: {
          msg: 'SurveyId is required'
        }
      }
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Answer is required'
        },
        notEmpty: {
          msg: 'Answer is required'
        }
      }
    }

  }, {
    sequelize,
    modelName: 'Answer',
  });
  return Answer;
};