var express = require('express');
var router = express.Router();
var models = require('../models');
router.get('/', function(req, res, next) {

  var site = {
    title : title,
    desc : desc
  }

  res.render('index', { site : site});

  // models.User.create({
  //   "name":"Surender","email":"surender"+Math.random()*10000+"@gmail.com","password":"qwertyu"+Math.random()
  // }).then(function(){res.render('index', { site : site});});


});

router.post('/signup',function(req,res,next){

  models.User.create(req.body,function(err,user){
    if(err) return next(err);
    console.log("User Created!");

  }
  ).then(function(){
    res.redirect('/dashboard');
  });
  console.log(req.body);

});
module.exports = router;
