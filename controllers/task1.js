var request = require('request');
var cheerio = require('cheerio');
var normalizeUrl = require('normalize-url');

module.exports = {

    getTitles: function(req, res){
        let titles = [];
        let addresses = req.query.address;
        if(addresses == null || addresses.length <= 0){
            res.render('index/index', {
                title: " No Addresses",
                scrapedTitles:  []
            });
            return;
        }
        if (typeof addresses == 'string') {
            addresses = [addresses];
        };
        let callback = function(){
            if (Object.keys(titles).length == addresses.length){
                res.render('index/index', {
                    title: " Following are the titles of given websites:",
                    scrapedTitles:  titles
                });
            }
        };

        addresses.forEach(address => {
            this.scrapeTitle(normalizeUrl(address), titles, callback);
        });
    },

    scrapeTitle: function(url, titles, callback) {
        var scrapeRequest = request({
            method: 'GET',
            url: url
        }, function(err, response, body) {
            let text = "";
            if (err) {  
                text = err.message
                if(err.code == "ENOTFOUND"){
                     text = "NO RESPONSE"
                }
            }
            else {
                $ = cheerio.load(body);
                text = $('head > title').text();
            }
            titles.push({
                url: url,
                title: text
            });
            callback();
        });
    }
};