var request = require('request');
var cheerio = require('cheerio');
var normalizeUrl = require('normalize-url');

// We are facing callback hell, depending on the time it takes to load and parse the html from each link
// the callbacks run at different times. To make sure our response is rendered with complete list of url 
// titles I am comparing addresses and titles. When they are the same I am rendering.

const get =  function(addresses, titles, callback){
                addresses.forEach(element => {
                    scrapeTitle(normalizeUrl(element),titles,callback);
                });
    }


function scrapeTitle(urlToScrape,titles,callback){
    request({
        method: 'GET',
        url: urlToScrape
    }, function(err, response, body) {
        // in case of error, return the error
        if (err) { titles.push(err.message); return console.error(err.message);}
        // Tell Cheerio to load the HTML page for scraping the title
        try{
            $ = cheerio.load(body);
            const scrapedTitle = $('head > title').text().toString();
            titles.push(scrapedTitle);
            console.log(scrapedTitle);
            callback();
        }
        catch(error){
            console.error(error.message);
            titles.push(error);
            callback();
        }
    });
}

module.exports.usingCallback = get;