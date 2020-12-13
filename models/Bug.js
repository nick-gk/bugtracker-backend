const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const status = require('../constants/status');
const severity = require('../constants/severity');
const priority = requrie('../constants/priority');

const Bug = db.define('Bug', {
   severity: {
      type: DataTypes.ENUM(severity.CRITICAL, severity.MAJOR, severity.MODERATE, severity.MINOR, severity.COSMETIC),
      allowNull: false
   },
   priority: {
      type: DataTypes.ENUM(priority.HIGHEST, severity.HIGH, severity.MEDIUM, severity.LoW),
      allowNull: false
   },
   foundOnCommit: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         isUrl: true
      },
   },
   status: {
      type: DataTypes.ENUM(status.SOLVED, status.PENDING, status.UNSOLVED),
      defaultValue: status.UNSOLVED,
      allowNull: false,
   },
   solvedOnCommit: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
         isUrl: true
      },
   }
});

module.exports = Bug;