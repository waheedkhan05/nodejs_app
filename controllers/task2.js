const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

var task2 = function(addresses,resp){
        let results = {};
        async.filter(addresses, function(address, callback) {
            request({
                method: 'GET',
                url: normalizeUrl(address)
            }, function(err, response, body) {
                // in case of error, return the error
                if (err) { results[address.toString()] = err.message; return callback(err,results);}
                // Tell Cheerio to load the HTML page for scraping the title
                try{
                $ = cheerio.load(body);
                const scrapedTitle = $('head > title').text().toString();
                results[address.toString()] = scrapedTitle;
                callback(null,results);
                }
                catch(error){
                    results[address.toString()] = error.message;
                    throw error;
                }
            });
          }, function(err, result) {
            if (err) {  console.error(err);}
              console.log(results);
              resp.render('index/index', {
                title: " Following are the titles of given websites:",
                scrapedTitles:  results
              });
          });
}

module.exports.usingAsync = task2;