'use strict';
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
    }
  }
  User.init({
    username: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [4, 30],
          msg: "Username must be between 4 and 30 characters."
        },
        isNotEmail(value) {
          const isEmail = require('validator/lib/isEmail');
          if (isEmail(value)) {
            throw new Error('Username cannot be an email address');
          }
        }
      }
    },

    email: {
      type: DataTypes.STRING, 
      allowNull: false,
      unique: true,
      isEmail: true,
      validate: {
        len: {
          args: [3, 256],
          msg: "Email must be between 3 and 256 characters."
        }
      }
    },

    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [60, 60],
          msg: "String length must be exactly 60 characters."
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    }
  });
  return User;
};
