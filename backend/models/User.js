const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  currency: {
    type: DataTypes.STRING,
    defaultValue: 'Ar'
  }
}, {
  tableName: 'users',
  timestamps: true
});

module.exports = User;
