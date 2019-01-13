
var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");
var axios = require("axios");



module.exports = function(app) {
  // Load signup page
  app.get("/", function(req, res) {
    return res.render("signup");
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/results/:keyword/:state", function(req, res) {
    console.log("Wohooo!");
  
    var state = req.params.state;
    var keyword = req.params.keyword;
    // console.log(keyword);
    var host = 'data.usajobs.gov';
    var userAgent = 'taylor.walker@hotmail.com';
    var authKey = 'SnG1WMVHJOBFFinDZmjikE4ce8QJwq4N4OLPxobdD4M=';
    axios.get("https://data.usajobs.gov/api/search?LocationName=" + state + "&Keyword=" + keyword, {
      headers: {
        "Host": host,
        "User-Agent": userAgent,
        "Authorization-Key": authKey
      }
    }).then(
      function (response) {
        console.log(JSON.stringify(response.data));
        // res.json(response.data.SearchResult.SearchResultItems);
        res.render("results", {
          jobs: response.data.SearchResult.SearchResultItems
        });
      }
    );
    
  });

 // Load results page
 app.get("/results", isAuthenticated, function(req, res) {
  db.User.findOne({
    where: {
      id: req.user.id
    },
    include: [db.Example]
  }).then(function(dbUser) {
    res.render("results", { user: dbUser });
  });
});

   // Load survey page
   app.get("/survey", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Example]
    }).then(function(dbUser) {
      res.render("survey", { user: dbUser });
    });
  });

  // Load profile page
  app.get("/profile", isAuthenticated, function(req, res) {
    db.User.findOne({
      where: {
        id: req.user.id
      },
      include: [db.Example]
    }).then(function(dbUser) {
      res.render("profile", { user: dbUser });
    });
  });

  
  // Load example page and pass in an example by id
  app.get("/example/:id", isAuthenticated, function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
