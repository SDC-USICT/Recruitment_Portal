var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {

  var site = {
    title : title,
    desc : desc,
      msg:  {
         msg: "Error !"
      }
  }

  res.render('index', { site : site});

});

module.exports = router;
