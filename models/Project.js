const { Sequelize, DataTypes, STRING } = require('sequelize');
const db = require('../config/db');
const User = require('./User');

const Project = db.define("Project", 
{
   title: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   description: {
      type: DataTypes.TEXT,
      allowNull: true,
   },
   repository: {
      type: DataTypes.STRING,
      validate: {
         isUrl: true
      }
   },
   user_id: {
      type: DataTypes.INTEGER,
      model: User,
      key: id,
   },
   bug_id: {
      type: DataTypes.INTEGER,
      model: Bug,
      key: id,
   }
});

module.exports = Project;