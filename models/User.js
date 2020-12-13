const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('Users', {
   uuid: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
   },
   // prenume: {
   //    type: DataTypes.STRING,
   //    allowNull: false
   // },
   // nume: {
   //    type: DataTypes.STRING,
   //    allowNull: false
   // },
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
})

module.exports = User;