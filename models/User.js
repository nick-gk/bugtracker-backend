const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const { roles } = require('../shared/constants');
const Project = require("./Project");

const User = db.define('Users', {
   uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
   },
   prenume: {
      type: DataTypes.STRING,
      allowNull: false
   },
   nume: {
      type: DataTypes.STRING,
      allowNull: false
   },
   email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
         isEmail: true
      }
   },
   password: {
      type: DataTypes.STRING,
      allowNull: false,
   },
   role: {
      type: DataTypes.STRING,
      validate: {
         isIn: [[roles.MP, roles.TST]],
      }
   },
}, 
{
   getterMethods: {
      fullname() {
         return this.nume + ' ' + this.prenume
      }
   }
});

User.belongsToMany(Project, {
   as: "engineers",
   through: 'ProjectTeam',
   foreignKey: "user_id",
});

Project.belongsToMany(User, {
   as: "project",
   through: 'ProjectTeam',
   foreignKey: "project_id",
});

module.exports = User;