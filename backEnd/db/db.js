require("dotenv").config();
const { Sequelize } = require("sequelize");

const { name } = require("../package.json");

const { Pool } = require("pg");

const db = new Sequelize(`${process.env.POSTGRES_URL}?sslmode=require`, {
  // username: process.env.USERNAME,
  // password: process.env.PASSWORD,
  logging: false,
  dialect: require("pg"),
});

module.exports = db;
