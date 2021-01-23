const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const { status, priority, severity } = require('../shared/constants');

const Bug = db.define('Bug', {
   severity: {
      type: DataTypes.STRING,
      validate: {
         isIn: [[severity.COSMETIC, severity.CRITICAL, severity.MAJOR, severity.MINOR, severity.MODERATE]]
      }
   },
   title: {
      type: DataTypes.TEXT,
      allowNull: false,
   },
   project_id: {
      type: Sequelize.INTEGER,
      allowNull: false
   },
   priority: {
      type: DataTypes.STRING,
      validate: {
         isIn: [[priority.HIGHEST, priority.HIGH, priority.MEDIUM, priority.LOW]]
      }
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
      validate: {
         isIn: [[status.PENDING, status.SOLVED, status.UNSOLVED]]
      }
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