// Will set up a route handler for the GET request

const express = require("express");
const router = express.Router();
const { Student, Campus } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allStudents = await Student.findAll(); //fetching all students from database

    allStudents
      ? res.status(200).json(allStudents)
      : res.status(404).send("Student List Not Found");
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", async (req, res, next) => {
  try {
    const studentID = req.params.id;
    console.log(studentID);
    const student = await Student.findByPk(studentID);

    if (!student) {
      res.status(404).send("Student not found");
    } else {
      await student.destroy();
      res.status(200).send("Student deleted successfully");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    console.log(studentId);
    const student = await Student.findByPk(studentId, { include: Campus }); //fetching a single student from database
    student
      ? res.status(200).json(student)
      : res.status(404).send("Student Not Found");
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (!req.body.imageUrl) {
      req.body.imageUrl =
        "https://t4.ftcdn.net/jpg/02/51/95/53/360_F_251955356_FAQH0U1y1TZw3ZcdPGybwUkH90a3VAhb.jpg";
    }
    const results = await Student.create(req.body);
    if (!results) {
      res.status(400).send("Failed to create Student");
    } else {
      res.status(200).send("Student added successfully");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const studentId = req.params.id;
    console.log(studentId);
    const student = await Student.findByPk(studentId);

    if (!student) {
      res.status(400).send("Failed to update Student");
    } else {
      await student.update(req.body);
      res.status(200).send("Student updated successfully");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
