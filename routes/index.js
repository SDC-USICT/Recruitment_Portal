var express = require('express');
var router = express.Router();
var models = require('../models');
var verify = require('../config/verify');
var passport = require('passport');
//var authPassport = require('../config/auth')(passport);
router.get('/',verify.isVerified, function(req, res, next) {

  var site = {
    title : title,
    desc : desc,
    loginMessage : req.flash('loginMessage'),
    signupMessage : req.flash('signupMessage'),
    message : req.flash('message')
  }

  res.render('index', { site : site});


});


//Passport Authentication is done is signup.
//Signup Route.
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/verify',
    failureRedirect : '/#signup',
    failureFlash : true
}));


// Login route
//passport Authenticationis yet to implement.
router.post('/login',passport.authenticate('local-login',{
  successRedirect : '/dashboard',
  failureRedirect : '/',
  failureFlash : true
}));

router.get('/logout', function (req, res){
  req.logOut();
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});

router.get('/verify', function(req, res, next) {

  var site = {
    title : title,
    desc : desc,
    loginMessage : req.flash('loginMessage'),
    signupMessage : req.flash('signupMessage'),
    verify : req.flash('verify')
  }

  res.render('verify', { site : site});


});

// Post route for verification
router.post('/verify', function(req, res, next) {


  console.log(req.body);
  models.User.findOne({where:{verification : req.body.verification}}).then(user=>{
    console.log(user);
    if(user.verification !== req.body.verification){
      res.redirect('/verify',req.flash('message', 'Verifcation code is Incorrect'));
    }
    else if(user.verification === req.body.verification){
      // Also create user as per your requiremnt
      req.flash('message', 'Successfully Created Account! Login to apply for jobs.')
      res.redirect('/');
    }
    else{
      res.redirect('/',req.flash('loginMessage', 'Something Wrong Happned!!'));
    }
  });

  // .catch(function(err){
  //     res.redirect('/',req.flash('loginMessage','Error Occurred!!!'));
  //     console.log("Error Occurred: "+err);
  // });


  //res.redirect('/verify',req.flash('message','Verification failed !'));
  //res.render('verify', { site : site});


});


// router.get('/error', function(req, res, next) {
//
//   var site = {
//     title : title,
//     desc : desc,
//     loginMessage : req.flash('loginMessage'),
//     signupMessage : req.flash('signupMessage'),
//     verify : req.flash('verify')
//   }
//
//   res.render('error', { site : site});
//
//
// });


module.exports = router;
