var express = require('express');
var router = express.Router();
var verify = require('../config/verify');
var applicant_mapping = require('../config/applicant_mapping');
var models = require('../models')


router.get('/',verify.isAuthenticated, function(req, res, next) {


    var site = {
        title : title,
        desc : desc
    }
    console.log(req.user.name);//It will console out Surender Kumar.
    res.render('dashboard', { site : site});

});

router.post('/userinfo',verify.isAuthenticated, function(req, res, next) {
          console.log(req);
          //var userinfo = {id:123,AadharId:123456}//req.body//applicant_mapping(req.body);
          //console.log(req.body);
    console.log('inside userfingo')
    console.log(req.body);
          var userinfo = {
              "FirstName" : req.body.first_name,
              "LastName" : req.body.last_name,
              "Discipline" : req.body.cse
          }

          //Transaction started.
    console.log(userinfo)
          models.sequelize.transaction(t=>{
            //Transaction Is used for only one session per user.
            return models.Applicant.findOne({where: { ApplicantId: req.user.UserId }})
                .then(
                    function (userDb) {
                        if(userDb)
                        return userDb.update(userinfo);
                        else {
                            return models.Applicant.create(userinfo);
                        }
                    }
                );

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
