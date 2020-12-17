const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const status = require('../constants/status');
const severity = require('../constants/severity');
const priority = require('../constants/priority');

const Bug = db.define('Bug', {
   severity: {
      type: DataTypes.STRING,
      allowNull: false
   },
   priority: {
      type: DataTypes.STRING,
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
      type: DataTypes.STRING,
      // defaultValue: status.UNSOLVED,
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