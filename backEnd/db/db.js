// require("dotenv").config();
const { Sequelize } = require("sequelize");

const { name } = require("../package.json");

const { Pool } = require("pg");

const db = new Sequelize(
  `postgres://crud-app-back-end-omega.vercel.app:5432/${name}`,
  {
    // username: process.env.USERNAME,
    // password: process.env.PASSWORD,
    logging: false,
    dialect: require("pg"),
  }
);

module.exports = db;
