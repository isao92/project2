var db = require("../models");
var express = require("express");
var app = express();
var path = require("path");
// module.exports = function(app) {
  // Load index page
  // app.get("/", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.render("index", {
  //       msg: "Welcome!",
  //       examples: dbExamples
  //     });
  //   });
  // });

  // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });
  module.exports = function(app) {

    // HTML GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------
  
    // If no matching route is found default to home
    app.get("/", function(req, res) {
      res.sendFile(path.join(__dirname, "/../starter.html"));
    });
    app.get("/survey", function(req, res) {
      res.sendFile(path.join(__dirname, "/survey.html"));
    });
  
  
  };
  
  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });

