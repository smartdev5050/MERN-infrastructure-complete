require("dotenv").config();
require("./config/database");

const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");

/**
 * LESSON WEEK 14 DAY 1: https://ps-rtt-sei.herokuapp.com/15-week/mod-3/week-14/day-1/slides/
 */

/**
 * Why don't we need to mount the express.urlencoded()middleware also?
 * Because express.urlencodedmiddleware is used to process data submitted by a form - and we don't submit forms in a SPA.
 */
const app = express();

app.use(logger("dev"));
app.use(express.json());

// Configure both serve-favicon & static middleware
// to serve from the production 'build' folder
app.use(favicon(path.join(__dirname, "build", "favicon.ico")));
app.use(express.static(path.join(__dirname, "build")));

// ROUTES

// CATCH ALL ROUTES - Put API routes here, before the "catch all" route

// The following "catch all" route (note the *) is necessary
// to return the index.html on all non-AJAX requests
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Configure to use port 3001 instead of 3000 during
// development to avoid collision with React's dev server
const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log(`Express app running on port ${port}`);
});
