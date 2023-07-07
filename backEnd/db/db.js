require("dotenv").config();
const { Sequelize } = require("sequelize");

const { name } = require("../package.json");

const { Pool } = require("pg");

const db = new Sequelize(`${process.env.POSTGRES_URL}?sslmode=require`, {
  logging: false,
  dialect: require("pg"),
});

module.exports = db;
