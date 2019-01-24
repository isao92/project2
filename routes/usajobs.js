require("dotenv").config();
var axios = require("axios");
var host = 'data.usajobs.gov';
<<<<<<< HEAD
var userAgent = 'taylor.walker@hotmail.com';
var authKey = process.env.USAJOBS_ID;
=======

>>>>>>> 6c0b59fc1ba764bd6e4fec953d79ee6c2e717883



axios.get("https://data.usajobs.gov/api/search?Keyword=Software", {
    headers: {
        "Host": host,
        "User-Agent": userAgent,
        "Authorization-Key": authKey
    }
}).then(
    function (response) {

        console.log(response.data);
    }
);
