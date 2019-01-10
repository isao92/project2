require("dotenv").config();
// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/api/careers", function (req, res) {
  const token = process.env.CAREER_TOKEN;
  const id = process.env.CAREER_ID;
  var keyword = req.params.keyword;
  axios.get(`https://api.careeronestop.org/v1/jobsearch/${id}/${keyword}/CA/25/0/0/0/10/30?source=NLx&showFilters=false`, {
    headers: {
      Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }).then(
    function (response) {
      // console.log(JSON.stringify(response.data));
      var career = response.data;
      res.json(career.Jobs);
     
    }
    ).catch(function(err){
     if (err)throw err }
  );
});

module.exports = router;