var express = require('express');
var router = express.Router();
var verify = require('../config/verify');



router.get('/', function(req, res, next) {


    var site = {
        title : title,
        desc : desc
    }

    res.render('dashboard', { site : site});

});

module.exports = router;
