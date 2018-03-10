const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

var task2 = function(req,resp){
    let title_array = [];
    let addresses = "";
    if (req.query.address) {
            if (req.query.address instanceof Array) {
                addresses = req.query.address;
            } else {
                addresses = [req.query.address];
            }
        }
        async.filter(addresses, function(address, callback) {
            request({
                method: 'GET',
                url: normalizeUrl(address)
            }, function(err, response, body) {
                // in case of error, return the error
                if (err) { title_array.push(err); return callback(err);}
                // Tell Cheerio to load the HTML page for scraping the title
                try{
                    $ = cheerio.load(body);
                    const scrapedTitle = $('head > title').text().toString();
                    title_array.push(scrapedTitle);
                    callback(err,title_array);
                }
                catch(error){
                    title_array.push({urlToScrape : error.message});
                    callback(error.message,title_array);
                }
            });
          }, function(err, results) {
            if (err) { title_array.push(err); return console.error(err);}
            //   console.log(title_array);
              resp.render('index/index', {
                title: " Following are the titles of given websites:",
                scrapedTitles:  title_array
              });
          });
}

module.exports.usingAsync = task2;