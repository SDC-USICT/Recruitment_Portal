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
        message : req.flash('message'),
        verify : req.flash('verify')
    }

    res.render('index', { site : site});


});


//Passport Authentication is done is signup.
//Signup Route.
router.post('/signup',passport.authenticate('local-signup',{
    successRedirect : '/#signup',
    failureRedirect : '/verify',
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

router.get('/verify',verify.isLoggedIn, function(req, res, next) {

    var site = {
        title : title,
        desc : desc,
        loginMessage : req.flash('loginMessage'),
        signupMessage : req.flash('signupMessage'),
        message : req.flash('message')
    }

    res.render('verify', { site : site});


});

// Post route for verification
router.post('/verify', function(req, res, next) {

    //Transaction started.
    models.sequelize.transaction(t=>{
        //Transaction Is used for only one session per user.
        return models.tempUser.findOne({where:{verification : req.body.verification}}).then(user=>{
   if(user == null){
         req.flash('message', 'Verifcation code is Incorrect')
        res.redirect('/verify');
    }
    //else if(user.verification === req.body.verification){
    else if(user.verification === req.body.verification){
        // Also create user as per your requiremnt
        user.isVerified = true;
        var newUser = {};
        newUser.name = user.name;
        newUser.email = user.email;
        newUser.password = user.password;
        newUser.isAdmin = false;
        return models.User.create(newUser).then(user=>{
                models.tempUser.destroy({where: {email:user.email}}).then(user=>{
                console.log("Temporary User Deleted");
    }).catch(function(err){
            throw err;
        });
        req.flash('message', 'Successfully Created Account! Login to apply for jobs.')
        res.redirect('/');
    }).catch(function(err){
            console.log("Error: "+err);
        })

    }
    else{
        req.flash('loginMessage', 'Something Wrong Happned!!')
        res.redirect('/');
    }
});


}).then(function(transaction){
        console.log("Transaction : "+ transaction);

    }).catch(function(err){
        console.log(err);

    });
    //Transaction ended.
});



module.exports = router;
