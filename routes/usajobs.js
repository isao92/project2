require("dotenv").config();
var axios = require("axios");
var host = 'data.usajobs.gov';



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
