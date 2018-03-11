var request = require('request');
var cheerio = require('cheerio');
var normalizeUrl = require('normalize-url');

// We are facing callback hell, depending on the time it takes to load and parse the html from each link
// the callbacks run at different times. To make sure our response is rendered with complete list of url 
// titles I am comparing addresses and titles. When they are the same I am rendering.


const task1 =  function(addresses, titles, callback){
                addresses.forEach(element => {
                    scrapeTitle(normalizeUrl(element),titles,callback);
                });
    }


function scrapeTitle(urlToScrape,titles,callback){
    var scrapeRequest = request({
        method: 'GET',
        url: urlToScrape
    }, function(err, response, body) {
        // in case of error, return the error
        if (err) 
        {  
            if(err.code === "ENOTFOUND")
                titles.push({url:urlToScrape,title:"NO RESPONSE"});
            console.error(err);
        }
        else{
            // Tell Cheerio to load the HTML page for scraping the title
            $ = cheerio.load(body);
            const scrapedTitle = $('head > title').text().toString();
            titles.push({'url':urlToScrape,'title': scrapedTitle});
            callback(titles);
        }
    });
}

module.exports.usingCallback = task1;