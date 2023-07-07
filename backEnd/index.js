const express = require("express");
const db = require("./db");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
// Mount on API
app.use("/api", require("./api"));

// Syncing DB Function
const syncDB = () =>
  db
    .sync()
    .then(() => {
      console.log("syncDB");
    })
    .catch((error) => {
      console.log("error", error);
    });

// Run server function
const serverRun = () => {
  app.listen(process.env.PORT, () => {
    console.log(`Live on port: ${process.env.PORT}`);
  });
};

syncDB();
serverRun();

module.exports = app;
