const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

var task2 = function(addresses,resp){
        let function_stack = [];
        addresses.forEach(element => {
            function_stack.push(function(callback){
                scrapeTitleForTask2(element,callback)
        });
        // function_stack is array of functions
        async.parallel(function_stack, function(err,results  ) {
            console.log(results);
                if (err) {  console.error(err);}
                  resp.render('index/index', {
                    title: " Following are the titles of given websites:",
                    scrapedTitles:  results
                  });
              });
});
}
var scrapeTitleForTask2 = function(element,callback){
    request({
    method: 'GET',
    url: normalizeUrl(element)
}, function(err, response, body) {
    // in case of error, return the error
    if (err) { console.log(err);callback(null,err.message)}
    // Tell Cheerio to load the HTML page for scraping the title

    $ = cheerio.load(body);
    const scrapedTitle = $('head > title').text();
    callback(null,scrapedTitle);
});
}
module.exports.usingAsync = task2;