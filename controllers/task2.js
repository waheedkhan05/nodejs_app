const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

var task2 = function(req,res,addresses,callback){
    // let titles = [];
    // let addresses = [];
    // if (req.query.address) {
    //         if (req.query.address instanceof Array) {
    //             addresses = req.query.address;
    //         } else {
    //             addresses = [req.query.address];
    //         }
    //     }
    //     async.filter(addresses, function(address, callback) {
            
    //         request({
    //             method: 'GET',
    //             url: normalizeUrl(address)
    //         }, function(err, response, body) {
    //             // in case of error, return the error
    //             if (err) { titles.push(err.message); return callback(err,titles);}
    //             // Tell Cheerio to load the HTML page for scraping the title
    //             try{
    //             $ = cheerio.load(body);
    //             const scrapedTitle = $('head > title').text().toString();
    //             titles.push(scrapedTitle);
    //             return callback(err,titles);
    //             }
    //             catch(error){
    //                 callback(error,titles);
    //             }
               
    //         });
    //       }, function(err, results) {
    //         if (err) { titles.push(err);  console.error(err);}
    //           console.log(results);
    //           resp.render('index/index', {
    //             title: " Following are the titles of given websites:",
    //             scrapedTitles:  titles
    //           });
    //       });
    let stack = [];
    let titles = [];
    addresses.forEach(element => {
        stack.push(
            function(callback){
                return function(){
                    request({
                        method: 'GET',
                        url: normalizeUrl(element)
                    }, function(err, response, body) {
                        // in case of error, return the error
                        // if (err) { titles.push(err.message); return callback(err,titles);}
                        // Tell Cheerio to load the HTML page for scraping the title
                        $ = cheerio.load(body);
                        const scrapedTitle = $('head > title').text().toString();
                        return callback(err,scrapedTitle);
                });
                return callback(err,scrapedTitle);
            }
    });
});
    async.parallel(stack,
    function(err, results) {
        if(err){console.error(err.message);}
        let output = {};
        console.log(results);
        for (let i = 0; i < results.length; i++) {
                  output[addresses[i]] = results[i];
                }
        res.render('index/index', {
                    title: " Following are the titles of given websites:",
                    scrapedTitles:  output
                });
    });
}

module.exports.usingAsync = task2;