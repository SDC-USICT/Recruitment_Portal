var express = require('express');
var router = express.Router();
var models = require('../models');
var verify = require('../config/verify');
var passport = require('passport');
//var authPassport = require('../config/auth')(passport);
router.get('/',verify.isLoggedIn, function(req, res, next) {

  var site = {
    title : title,
    desc : desc,
    loginMessage : req.flash('loginMessage'),
    signupMessage : req.flash('signupMessage'),
    verify : req.flash('verify')
  }

  res.render('index', { site : site});


});


//Passport Authentication is done is signup.
//Signup Route.
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/',
    failureRedirect : '/dashboard',
    failureFlash : true
}));


// Login route
//passport Authenticationis yet to implement.
router.post('/login',passport.authenticate('local-login',{
  successRedirect : '/dashboard',
  failureRedirect : '/#login',
  failureFlash : true
}));

router.get('/logout', function (req, res){
  req.logOut();
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});


module.exports = router;
