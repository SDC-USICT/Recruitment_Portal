var express = require('express');
var router = express.Router();
var models = require('../models');
router.get('/', function(req, res, next) {

  var site = {
    title : title,
    desc : desc
  }

  models.Login.create({
    "email":"surender"+Math.random()*10000+"@gmail.com","pwd":"qwertyu"+Math.random(),"verification":"wertyui"
  }).then(function(){res.render('index', { site : site});});


});

module.exports = router;
