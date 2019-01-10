var db = require("../models");
var axios = require("axios");
module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.json(dbExamples);
    });
  });

  app.get("/api/usajobs/:keyword", function (req, res) {
    var keyword = req.params.keyword;
    console.log(keyword);
    var host = 'data.usajobs.gov';
    var userAgent = 'taylor.walker@hotmail.com';
    var authKey = 'SnG1WMVHJOBFFinDZmjikE4ce8QJwq4N4OLPxobdD4M=';
    axios.get("https://data.usajobs.gov/api/search?LocationName=California&Keyword=" + keyword, {
      headers: {
        "Host": host,
        "User-Agent": userAgent,
        "Authorization-Key": authKey
      }
    }).then(
      function (response) {
        res.json(response.data);
        for (i = 0; i < response.data.length; i++) {
          var qualSum = response.data[i].MatchedObjectDescriptor.text.toLowerCase();
                        if (qualSum.includes(Marketing&Sales.toLowerCase())) {
                        console.log("hello!");
                        }
        }
                       
      }

    );
  });

// }






  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function (dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (
      dbExample
    ) {
      res.json(dbExample);
    });
  });
};
