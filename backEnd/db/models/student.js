const { DataTypes } = require("sequelize");
const db = require("../db");

//Our student table with the following attributes for each
const Student = db.define("student", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gpa: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;
