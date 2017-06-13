var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var title = "Recruitment Portal";
  var desc = "Online Portal to apply for various posts at GGSIP University";

  var site = {
    title : title,
    desc : desc
  }

  res.render('index', { site : site});

});

module.exports = router;
