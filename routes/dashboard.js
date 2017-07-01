var express = require('express');
var router = express.Router();
var verify = require('../config/verify');



router.get('/',verify.isAuthenticated, function(req, res, next) {


    var site = {
        title : title,
        desc : desc
    }

    res.render('dashboard', { site : site});

});

router.post('/userinfo',verify.isAuthenticated, function(req, res, next) {
        console.log(req.body);
        res.send('Hello')

});

router.post('/apply',verify.isAuthenticated, function(req, res, next) {


});


module.exports = router;
