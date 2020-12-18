const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');
const { roles } = require('../shared/constants');

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
   }
}, 
{
   getterMethods: {
      fullname() {
         return this.nume + ' ' + this.prenume
      }
   }
})

module.exports = User;