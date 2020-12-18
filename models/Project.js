const { Sequelize, DataTypes, STRING } = require('sequelize');
const db = require('../config/db');

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
});



module.exports = Project;