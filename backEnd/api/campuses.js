// Will set up a route handler for the GET request

const express = require("express");
const router = express.Router();
const { Campus, Student } = require("../db/models");

router.get("/", async (req, res, next) => {
  try {
    const allCampuses = await Campus.findAll({ include: Student });
    allCampuses
      ? res.status(200).json(allCampuses)
      : res.status(404).send("Campus List Not Found");
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const campusID = req.params.id;
    console.log(campusID);
    const campus = await Campus.findByPk(campusID);

    if (!campus) {
      res.status(404).send("Campus not found");
    } else {
      await campus.destroy();
      res.status(200).send("Campus deleted successfully");
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const campusId = req.params.id;
    const campus = await Campus.findByPk(campusId);
    const students = await Student.findAll({ where: { campusId } });

    const campusData = {
      ...campus.toJSON(),
      students: students || [],
    };

    campus
      ? res.status(200).json(campusData)
      : res.status(404).send("Campus Not Found");
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
    const results = await Campus.create(req.body);
    if (!results) {
      res.status(400).send("Failed to create campus");
    } else {
      res.status(200).send("Campus added successfully");
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    console.log(req.params.id);
    const campusId = req.params.id;

    const campus = await Campus.findByPk(campusId);

    if (!campus) {
      res.status(400).send("Failed to update campus");
    } else {
      await campus.update(req.body);
      res.status(200).send("Campus updated successfully");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
