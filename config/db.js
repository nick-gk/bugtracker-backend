const { Sequelize } = require("sequelize");
const config = require("config");

const sequelize = new Sequelize(config.get("database"), config.get("username"), config.get("password"), {
    host: config.get("hostname"),
    dialect: "mssql",
});

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

module.exports = connectDB;