const cheerio = require('cheerio');
const normalizeUrl = require('normalize-url');
const request = require("request");


module.exports = {
    getTitles: function(req, res){
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
        var webRequests = addresses.map(function(address) {
            return new Promise(function(resolve, reject) {
                        request({
                            method: 'GET',
                            url: normalizeUrl(address)
                        }, function(err, response, body) {
                            let test = '';
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
                            return resolve({
                                url: address,
                                title: text
                            });

                        });
                    });
                });
        
        Promise.all(webRequests).then(function(results) {
            res.render('index/index', {
                        title: " Following are the titles of given websites:",
                        scrapedTitles:  results
                    });
        }).catch(function(err){
            res.render('index/index', {
                        title: "System has got some issues.",
                        errors:  err
                    });
        });
    }
};