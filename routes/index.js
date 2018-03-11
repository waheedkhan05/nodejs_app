'use strict';
var express = require('express');
var task1 = require("../controllers/task1")
var task2 = require("../controllers/task2")
var task3 = require("../controllers/task3")
var router = express.Router();

// GET: /
router.get('/I/want/title', function(req, res) {
  
  const type = req.query.type

  if(!type || type == 1) {
    task1.getTitles(req, res);
  }
  else if(type == 2) {
    task2.getTitles(req, res);
  }
  else if(type == 3) {
    task3.getTitles(req, res);
  }

});
// Get for any other route besides I/want/title
router.get('/*', function(req, res){
  res.render('404',{
    title: 'Page cannot be found'
  });
});

module.exports = router;
