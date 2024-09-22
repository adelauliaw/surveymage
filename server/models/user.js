'use strict';
const { hashPassword, comparePassword } = require('../helpers/bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Survey, { foreignKey: 'userId' })
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email must be unique"
      },
      validate: {
        isEmail: {
          msg: 'Invalid email format'
        },
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'admin'
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};