const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

var task2 = function(addresses,resp){
        let results = {};
        async.filter(addresses, function(address, callback) {
            var scrapeRequest =  request({
                method: 'GET',
                url: normalizeUrl(address)
            }, function(err, response, body) {
                // in case of error, return the error
                if (err) { results[address.toString()] = err.message; console.log(err);}
                // Tell Cheerio to load the HTML page for scraping the title
 
                $ = cheerio.load(body);
                const scrapedTitle = $('head > title').text().toString();
                results[address.toString()] = scrapedTitle;
                return callback(null,results);
            });
            scrapeRequest.on('error', function (err) {
                if(err.code === "ENOTFOUND")
                results[address] = "NO RESPONSE";
            });
          }, function(err, result) {
            if (err) {  console.error(err);}
              resp.render('index/index', {
                title: " Following are the titles of given websites:",
                scrapedTitles:  results
              });
          });
}

module.exports.usingAsync = task2;