var express = require('express');
var router = express.Router();
var models = require('../models');
var verify = require('../config/verify');
var passport = require('passport');
//var authPassport = require('../config/auth')(passport);
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


//Passport Authentication is done is signup.
//Signup Route.
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/dashboard',
    failureRedirect : '/',
    failureFlash : true
}));


// Login route
//passport Authenticationis yet to implement.
router.post('/login',passport.authenticate('local-login',{
  successRedirect : '/dashboard',
  failureRedirect : '/admin',
  failureFlash : true
}));



module.exports = router;
