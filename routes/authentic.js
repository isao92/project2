// Include the axios npm package (Don't forget to run "npm install axios" in this folder first!)
var axios = require("axios");
var express = require("express");
var router = express.Router();

router.get("/api/jobs", function (req, res) {
  axios.get("https://authenticjobs.com/api/?api_key=e76f186f3463d7dea8c9267a7855a0e1&category=aj.categories.getList&format=json&method=aj.jobs.search&perpage10").then(
    function (response) {
      // console.log(JSON.stringify(response.data));
      res.json(response.data);
    }
    // ).catch(function(err){
    //  if (err)throw err }
  );
});


module.exports = router;