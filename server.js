require("dotenv").config();
require("./config/database");
const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const port = process.env.PORT || 3001;
const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// Routes
// Put API routes here, before the "catch all" route
app.use("/api/users", require("./routes/api/users"));

// Catch all route

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Where we at
app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
