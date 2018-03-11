'use strict';
var express = require('express');
var task1 = require("../controllers/task1")
var task2 = require("../controllers/task2")
var task3 = require("../controllers/task3")
var router = express.Router();

// GET: /
router.get('/I/want/title', function(req, res) {
  let results = {};
  let addresses = [];
  addresses = req.query.address
  if (!addresses instanceof Array) {
	    addresses = [addresses];
  }
  // Task1
  // task1.usingCallback(addresses,results,function(){
  //   // comparing results and addresses to make sure all the functions have run and returned the response.
  //   if (Object.keys(results).length == addresses.length){
  //     res.render('index/index', {
  //         title: " Following are the titles of given websites:",
  //         scrapedTitles:  results
  //     });
  //   }
  // });

  //Task 2
  task2.usingAsync(addresses,res);

  // Task3
  // task3.usingPromise(addresses,res);

});
// Get for any other route besides I/want/title
router.get('/*', function(req, res){
  res.render('404',{
    title: 'Page cannot be found'
  });
});

module.exports = router;
