var express = require('express');
var router = express.Router();
var verify = require('../config/verify');
var applicant_mapping = require('../config/applicant_mapping');



router.get('/',verify.isAuthenticated, function(req, res, next) {


    var site = {
        title : title,
        desc : desc
    }

    res.render('dashboard', { site : site});

});

router.post('/userinfo',verify.isAuthenticated, function(req, res, next) {
          var userinfo = {id:123,AadharId:123456}//req.body//applicant_mapping(req.body);
          //console.log(req.body);
          //Transaction started.
          models.sequelize.transaction(t=>{
            //Transaction Is used for only one session per user.
            return models.applicant.create(userinfo).then(userinfo=>{
              console.log("User Information is Saved. ");
            });

          }).then(function(transaction){
            console.log("Transaction : "+ transaction);

          }).catch(function(err){
            console.log(err);
            console.log("Rolled Back");

          });
          //Transaction ended.


});

router.post('/apply',verify.isAuthenticated, function(req, res, next) {


});


module.exports = router;
