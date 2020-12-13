const { Sequelize } = require("sequelize");
const config = require("config");

const db = new Sequelize(config.get("database"), config.get("username"), config.get("password"), {
    host: config.get("hostname"),
    dialect: "mssql",
    logging: true
});

module.exports = db;