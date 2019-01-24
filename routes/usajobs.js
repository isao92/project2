require("dotenv").config();
var axios = require("axios");
var host = 'data.usajobs.gov';
var userAgent = 'taylor.walker@hotmail.com';
var authKey = process.env.USAJOBS_ID;



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
