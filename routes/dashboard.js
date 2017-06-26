var express = require('express');
var router = express.Router();

router.get('/', isLoggedIn, function(req, res, next) {


    var site = {
        title : title,
        desc : desc,
        user : req.user
    }

    res.render('dashboard', { site : site});

});


function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

module.exports = router;
