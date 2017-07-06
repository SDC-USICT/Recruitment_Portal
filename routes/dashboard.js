var express = require('express');
var router = express.Router();
var verify = require('../config/verify');
var applicant_mapping = require('../config/applicant_mapping');
var models = require('../models')


router.get('/',verify.isAuthenticated, function(req, res, next) {


    var site = {
        title : title,
        desc : desc,
        ApplicantId: req.user.UserId
    }
    res.render('dashboard', { 'site' : site});

});

router.post('/userinfo',verify.isAuthenticated, function(req, res, next) {
    console.log('inside userfingo')
          var userinfo = applicant_mapping(req);

          //Transaction started.
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

          }).catch(function(err){

          });
          //Transaction ended.


});

router.post('/apply',verify.isAuthenticated, function(req, res, next) {
        //Transaction Started
        models.sequelize.transaction(t=>{
            //Transaction Is used for only one session per user.
            return models.candidates_2017.findOne({
              where:{
                vacancy_id:req.body.vacancy_id,
                ApplicantId:req.user.UserId
              }}).then(application=>{
                var applicationForm = applicant_mapping(req);
                applicationForm.vacancy_id = req.body.vacancy_id;
                applicationForm.ApplicantId = req.user.UserId;
            if(!application){
              return models.candidates_2017.create(applicationForm).then(application=>{
                req.flash('message','Your application submitted Successfully');
                console.log("Application Submitted");
                return res.redirect('/admin/dashboard');
              }).catch(function(err){
                console.log(err);
              });

            }
            else if(application){
              req.flash('message','Your Application Already Submitted');
              return res.redirect('/dashboard');
            }
            req.flash('message','Error Occurred!!');
            return res.redirect('/dashboard');
        }).catch(function(err){
                console.log("Error: "+err);
                throw err;
            });
    }).then(function(transaction){
            console.log("Transaction : "+ transaction);
            res.redirect('/dashboard');

        }).catch(function(err){
            console.log(err);
            throw err;

        });
        res.redirect('/dashboard');
        //Transaction ended.
    // console.log(req.user.UserId);

});

router.get('/vacancies', verify.isAuthenticated, function(req, res, next) {
    return models.vacancy.findAll()
        .then(function (v) {
            if(v){
                res.send(JSON.stringify(v))
            }
        })
})

router.post('/app_data', verify.isAuthenticated, function (req, res, next) {
    console.log("app_data \n"+req.body)
    return models.candidates_2017.findAll({where: {'ApplicantId' : req.user.UserId, 'vacancy_id' : req.body.vid}})
        .then(v=> {
            if(v){
                res.send(JSON.stringify(v));
            }
        });
});

router.post('/applied_to', verify.isAuthenticated, function (req, res,next) {
    return models.candidates_2017.findAll({where: {'ApplicantId' : req.user.UserId}})
        .then(v=> {
          console.log(v);
            if(v){
                res.send(JSON.stringify(v));
            } else {
                res.send(JSON.stringify({'error' : 'No Applications by this candidate!'}))
            }
        });

      });

router.get('/information', verify.isAuthenticated, function (req, res, next) {
    console.log("Body in information"+req.body)
    return models.Applicant.findAll({where: {'ApplicantId' : req.user.UserId}})
        .then(v=> {
            if(v){
                res.send(JSON.stringify(v));
            }
        });
});

module.exports = router;
