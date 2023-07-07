const router = require("express").Router();

// Mounting the route handlers for student and campuses
router.use("/students", require("./students"));
router.use("/campuses", require("./campuses"));

// 404 Handling
router.use((req, res, next) => {
  const error = new Error("404 Not Found");
  error.status = 404;
  next(error);
});

module.exports = router;
