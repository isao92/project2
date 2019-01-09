// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/api/careers", function (req, res) {
  const token = "3eLG7hgV7sgwNHpdSAfJYD6OxnbAZl56ZeJDYYMbB2YzOwW/F+TRucZkejBgc1hCVt6SOvWY4OiA3CihuzarKA==";
  axios.get("https://api.careeronestop.org/v1/jobsearch/tNUi5ft3dAjirVq/public%20relations/CA/25/0/0/0/10/30?source=NLx&showFilters=false", {
    headers: {
      Authorization: 'Bearer ' + token //the token is a variable which holds the token
    }
  }).then(
    function (response) {
      // console.log(JSON.stringify(response.data));
      res.json(response.data);
    }
    // ).catch(function(err){
    //  if (err)throw err }
  );
});

module.exports = router;