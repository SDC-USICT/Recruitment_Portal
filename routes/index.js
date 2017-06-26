var express = require('express');
var router = express.Router();


module.exports = function (passport) {
    router.get('/', function(req, res, next) {

        var site = {
            title : title,
            desc : desc
        }

        res.render('index', { site : site});

    });

    router.post(
        '/login',
        passport.authenticate('local-login', {
            successRedirect: '/dashboard',
            failureRedirect: '/',
            failureFlash : true
        }),
        function (req, res) {
            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }

            res.redirect('/');
        }
    )

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/',
        failureRedirect : '/',
        failureFlash : true
    }));

    router.get('/logout', function(req, res) {
        console.log("LOGOUT!");
        req.logout();
        res.redirect('/');
    });

    return router;
};
