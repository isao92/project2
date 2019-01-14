var axios = require("axios");
var express = require("express");
var router = express.Router();


// var axios = require("axios");
// var host = 'data.usajobs.gov';
// var userAgent = 'taylor.walker@hotmail.com';
// var authKey = 'SnG1WMVHJOBFFinDZmjikE4ce8QJwq4N4OLPxobdD4M=';



// axios.get("https://data.usajobs.gov/api/search?Keyword=Software", {
//     headers: {
//         "Host": host,
//         "User-Agent": userAgent,
//         "Authorization-Key": authKey
//     }
// }).then(
//     function (response) {

//         console.log(response.data);
//     }
// );
 router.get("/results/:keyword/:state", function(req, res) {
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
        // console.log(JSON.stringify(response.data));
        // res.json(response.data.SearchResult.SearchResultItems);
        res.render("results", {
          jobs: response.data.SearchResult.SearchResultItems
        });
      }
    );
    
  });
  