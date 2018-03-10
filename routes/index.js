'use strict';
var express = require('express');
var task1 = require("../controllers/task1")
var task2 = require("../controllers/task2")
var router = express.Router();

// GET: /
router.get('/I/want/title', function(req, res) {
  let url_titles = [];
  task2.usingAsync(req,res);
});
// Get for any other route besides I/want/title
router.get('/*', function(req, res){
  res.render('404',{
    title: 'Page cannot be found'
  });
});

module.exports = router;
