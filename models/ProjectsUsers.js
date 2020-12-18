const { Sequelize } = require('sequelize');
const db = require('../config/db');

const ProjectsUsers = db.define("ProjectsUsers", {
   user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
   },

   project_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      allowNull: false
   }
});

module.exports = ProjectsUsers;