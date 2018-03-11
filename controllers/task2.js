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
        async.parallel(function_stack, function(err,results,address) {
            // console.log(results);
            if (err) { 
                console.error(err);
            }
            if(addresses.length == Object.keys(results).length){
                console.log(results);
                resp.render('index/index', {
                    title: " Following are the titles of given websites:",
                    scrapedTitles:  results
                });
            } 
        });
});
}
var scrapeTitleForTask2 = function(element,callback){
    request({
        method: 'GET',
        url: normalizeUrl(element)
    }, function(err, response, body) {
        let text = "";
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

        callback(null,{
            url: element,
            title: text
        });
    });
}
module.exports.usingAsync = task2;