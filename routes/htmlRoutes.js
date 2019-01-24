var db = require("../models");

var isAuthenticated = require("../config/middleware/isAuthenticated");
var axios = require("axios");

var findExp = [];
var x = 0;
var hasLoaded = false;
var theMatchedEventId = [];
var theMatchedEventJobTitle = [];
var theMatchedEventJobUrl = [];
var theMatchedEventJobLocation = [];
var theMatchedEventJobOrganizationName = [];
var jobObjectWithMatches = [];
var jobDetailsOrdered = [];
var arrayOfJobObjects = [];

// variables for matched titles and everything

var matchedTitleOne = "";



module.exports = function(app) {
  // Load signup page
  app.get("/", function(req, res) {
    return res.render("signup");
  });

  // Load login page
  app.get("/login", function(req, res) {
    res.render("login");
  });

  app.get("/results/:keyword/:state/:experience", function(req, res) {
    var state = req.params.state;
    var keyword = req.params.keyword;
    var experience = req.params.experience;

    // set keywords according to experience level
    if (experience == "lessThanThree") {
      findExp = ["Internship", "intern", "junior developer", "junior associate", "Volunteer", "VOLUNTEER", "Associate's", "officer's assistant", "assistant", "junior officer", "STUDENT"];
      console.log("lessThanThree");
      hasLoaded = true;
    } else if (experience == "threeToFive") {
      findExp = [
        "Bachelor's",
        "bachelor's",
        "intermediate",
        "middle-level",
        "Four years",
        "Technician",
        "Administrator",
        "Specialist"
      ];
      console.log("threeToFive");
      hasLoaded = true;
    } else if (experience == "moreThanFive") {
      findExp = [
        "Senior",
        "Supervisor",
        "Excecutive",
        "top-level",
        "higher grade level",
        "Master's",
        "Chief"
      ];
      console.log("moreThanFive");
      hasLoaded = true;
    }

    // console.log(keyword);
    var host = "data.usajobs.gov";
    var userAgent = "taylor.walker@hotmail.com";
    var authKey = "SnG1WMVHJOBFFinDZmjikE4ce8QJwq4N4OLPxobdD4M=";
    axios
      .get(
        "https://data.usajobs.gov/api/search?LocationName=" +
          state +
          "&Keyword=" +
          keyword,
        {
          headers: {
            Host: host,
            "User-Agent": userAgent,
            "Authorization-Key": authKey
          }
        }
      )
      .then(function(response) {
        // Loop goes through all job postings
        for (
          var j = 0;
          j < response.data.SearchResult.SearchResultItems.length;
          j++
        ) {
          // get id of current job posting being analyzed
          console.log(
            response.data.SearchResult.SearchResultItems[j].MatchedObjectId
          );

          // Loop goes through each keyword from experience level
          for (var i = 0; i < findExp.length; i++) {
            // hasLoaded becomes true when experience level is detected
            if (hasLoaded) {
              try {
                // store qualification summary into variable
                var quaSumm =
                  response.data.SearchResult.SearchResultItems[j]
                    .MatchedObjectDescriptor.PositionTitle;
                // store boolean in variable if keyword is detected
                var foundExpLevel = quaSumm.includes(findExp[i]);

                // find keyword related to the experience level
                if (foundExpLevel) {
                  
                  console.log("Found a match!");

                  // get unique id of matched event and store it in a variable
                  var matchedId =
                    response.data.SearchResult.SearchResultItems[j]
                      .MatchedObjectId;
                  // get title
                  var matchedListingTitle =
                    response.data.SearchResult.SearchResultItems[j]
                      .MatchedObjectDescriptor.PositionTitle;
                  // get Url
                  var matchedUrl =
                    response.data.SearchResult.SearchResultItems[j]
                      .MatchedObjectDescriptor.PositionURI;
                  // get location
                  var matchedLocation =
                    response.data.SearchResult.SearchResultItems[j]
                      .MatchedObjectDescriptor.PositionLocationDisplay;
                  // get organization name
                  var matchedOrganization =
                    response.data.SearchResult.SearchResultItems[j]
                      .MatchedObjectDescriptor.OrganizationName;

                  console.log("This is the matched job posting: " + matchedId);

                  theMatchedEventId[x] = matchedId;
                  theMatchedEventJobTitle[x] = matchedListingTitle;
                  theMatchedEventJobUrl[x] = matchedUrl;
                  theMatchedEventJobLocation[x] = matchedLocation;
                  theMatchedEventJobOrganizationName[x] = matchedOrganization;

                  var jobTitle = theMatchedEventJobTitle[x];
                  var jobUrl= theMatchedEventJobUrl[x];
                  var jobLocation= theMatchedEventJobLocation[x];
                  var jobOrganizationName= theMatchedEventJobOrganizationName[x];

                  // create object and store each value in an object
                  jobObjectWithMatches = {
                    arrayOfJobTitles: [
                      jobTitle
                    ]
                  }

                  jobObjectWithUrl = {
                    arrayOfJobTitles: [
                      jobUrl
                    ]
                  }

                  jobObjectWithLocation = {
                    arrayOfJobTitles: [
                      jobLocation
                    ]
                  }

                  jobObjectWithOrganizationName = {
                    arrayOfJobTitles: [
                      jobOrganizationName
                    ]
                  }

<<<<<<< HEAD

=======
>>>>>>> 6c0b59fc1ba764bd6e4fec953d79ee6c2e717883
                  x++;
                }
              } catch (error) {
                console.log(error);
              }
            } else {
              console.log("No experience level detected");
            }
          }
        }
        
        res.render("results", {
          jobs: response.data.SearchResult.SearchResultItems,
          jobsMatched: jobObjectWithMatches,
          jobsMatched2: jobObjectWithUrl,
          jobsMatched3: jobObjectWithLocation,
          jobsMatched4: jobObjectWithOrganizationName
          
        });
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
