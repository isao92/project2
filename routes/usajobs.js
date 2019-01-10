var axios = require("axios");
var host = 'data.usajobs.gov';
var userAgent = 'taylor.walker@hotmail.com';
var authKey = 'SnG1WMVHJOBFFinDZmjikE4ce8QJwq4N4OLPxobdD4M=';



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
