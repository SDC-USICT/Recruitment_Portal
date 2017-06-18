var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

    var site = {
        title : title,
        desc : desc
    }

    res.render('admin/index', { site : site});

});

module.exports = router;
