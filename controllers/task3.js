const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');
const request = require("request");

var get = function(addresses,res){
    // Use .map to issue the request for each title and push the Promise 
    // to a webRequests variable.
    var webRequests = addresses.map(function(address) {
        return new Promise(function(resolve, reject) {
                    request({
                        method: 'GET',
                        url: normalizeUrl(address)
                    }, function(err, response, body) {
                        // Tell Cheerio to load the HTML page for scraping the title
                        let test = '';
                        if (err) { 
                            console.log(err);
                            if(err.code == "ENOTFOUND"){
                                text = "NO RESPONSE"
                            }
                            else{
                                text = err.message
                            }
                        }
                        else{
                            $ = cheerio.load(body);
                            text = $('head > title').text();
                        }
                        return resolve({
                            url: address,
                            title: text
                        });

                    });
                });
            });
    // Use Promise.all to wait for all requests to grab the titles or error
    // and send the response to the client.
    Promise.all(webRequests).then(function(results) {
        res.render('index/index', {
                    title: " Following are the titles of given websites:",
                    scrapedTitles:  results
                });
    }).catch(err => console.log(err));
} // end module function

module.exports.usingPromise = get;