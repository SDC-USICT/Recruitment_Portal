var express = require('express');
var router = express.Router();
var models = require('../../models');
var verify = require('../../config/verify');
var passport = require('passport');

//router.get('/', function(req, res, next) {

//    var site = {
//        title : title,
//        desc : desc
//    }

//    res.render('admin/index', { site : site});

//});
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

    res.render('admin/index', { site : site});


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
    successRedirect : '/admin/dashboard',
    failureRedirect : '/admin',
    failureFlash : true
}));

router.get('/logout', function (req, res){
    req.logOut();
    req.session.destroy(function (err) {
        res.redirect('/admin'); //Inside a callback… bulletproof!
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
        return models.tempAdminUser.findOne({where:{verification : req.body.verification}}).then(admin_user=>{
   if(admin_user == null){
         req.flash('message', 'Verifcation code is Incorrect')
        res.redirect('/verify');
    }
    //else if(user.verification === req.body.verification){
    else if(adminUser.verification === req.body.verification){
        // Also create user as per your requiremnt
        adminUser.isVerified = true;
        var newAdminUser = {};
        newAdminUser.name = adminUser.name;
        newAdminUser.email = adminUser.email;
        newAdminUser.password = adminUser.password;
        return models.adminUser.create(newAdminUser).then(admin_user=>{
                models.tempAdminUser.destroy({where: {email:adminUser.email}}).then(admin_user=>{
                console.log("Temporary Admin User Deleted");
    }).catch(function(err){
            throw err;
        });
        req.flash('message', 'Successfully Created Admin Account')
        res.redirect('/admin');
    }).catch(function(err){
            console.log("Error: "+err);
        })

    }
    else{
        req.flash('loginMessage', 'Error occurred during login')
        res.redirect('/admin');
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
