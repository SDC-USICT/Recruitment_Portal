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
router.post('/login',function(req,res,next){

  // models.User.findOne({where:{email:req.body.username}
  // }).then(user=> {
  // console.log("Logged In");
  // var token = verify.createJWT(user);
  // console.log("Token: "+token);
  //   res.json({token: token});
  // });
  // successRedirect : '/dashboard',
  // failureRedirect : '/'
  console.log(req.body);

});



module.exports = router;
