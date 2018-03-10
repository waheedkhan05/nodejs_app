var request = require('request');
var cheerio = require('cheerio');
var normalizeUrl = require('normalize-url');

// We are facing callback hell, depending on the time it takes to load and parse the html from each link
// the callbacks run at different times. To make sure our response is rendered with complete list of url 
// titles keeping in view not to use any abstraction I have added setTimeout which is definitely 
// not the way to do.

const get =  function(req,resp,title_array){
            if (req.query.address) {
            let inputData = "";
                if (req.query.address instanceof Array) {
                    inputData = req.query.address;
                } else {
                    inputData = [req.query.address];
                }
                inputData.forEach(element => {
                    scrapeTitle(normalizeUrl(element),title_array,resp);
                });
            }
    }



function scrapeTitle(urlToScrape,title_array,res){
    request({
        method: 'GET',
        url: urlToScrape
    }, function(err, response, body) {
        // in case of error, return the error
        if (err) return console.error(err);
        // Tell Cheerio to load the HTML page for scraping the title
        $ = cheerio.load(body);
        const scrapedTitle = $('head > title').text()
        title_array.push(scrapedTitle);
        console.log(title_array);
    });
    // render response, the titles of the addresses query.
    setTimeout(function(){
        res.render('index/index', {
        title: " Following are the titles of given websites:",
        scrapedTitles:  title_array
      }); }, 2000);
}

module.exports.usingCallback = get;