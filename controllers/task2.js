const async = require("async");
const request = require("request");
const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');

module.exports = {
    getTitles: function(req, resp) {
        const me = this;
        let function_stack = [];
        let addresses = req.query.address;
        if(addresses == null || addresses.length <= 0){
            resp.render('index/index', {
                title: " No Addresses",
                scrapedTitles:  []
            });
            return;
        }
        if (typeof addresses == 'string') {
            addresses = [addresses];
        };
        addresses.forEach(element => {
                function_stack.push(function(callback){
                    me.scrapeTitle(element,callback)
            });
            async.parallel(function_stack, function(err,results,address) {
                if (err) { 
                    resp.render('index/index', {
                        title: "System has got some issues.",
                        errors:  err
                    });
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
    },

    scrapeTitle: function(element, callback) {
        request({
            method: 'GET',
            url: normalizeUrl(element)
        }, function(err, response, body) {
            let text = "";
            if (err) { 
                text = err.message
                if(err.code == "ENOTFOUND"){
                     text = "NO RESPONSE"
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
};
