'use strict';
var express = require('express');
var task1 = require("../controllers/task1")
var router = express.Router();

// GET: /
router.get('/I/want/title', function(req, res) {
  let url_titles = [];
  task1.usingCallback(req,res,url_titles);
  // res.render('index/index', {
  //   title: " Following are the titles of given websites:",
  //   scrapedTitles: url_titles
  // });
});
// Get for any other route besides I/want/title
router.get('/*', function(req, res){
  res.render('404',{
    title: 'Page cannot be found'
  });
});

module.exports = router;
