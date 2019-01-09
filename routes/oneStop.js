// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/api/jobs", function (req, res) {
  axios.get("https://api.careeronestop.org/v1/jobsearch/tNUi5ft3dAjirVq/finance/CA/25/0/0/0/10/30?source=NLx&showFilters=false").then(
    function (response) {
      // console.log(JSON.stringify(response.data));
      res.json(response.data);
    }
    // ).catch(function(err){
    //  if (err)throw err }
  );
});