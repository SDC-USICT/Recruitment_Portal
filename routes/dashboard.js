var express = require('express');
var router = express.Router();
var verify = require('../config/verify');
var applicant_mapping = require('../config/applicant_mapping');
var models = require('../models')
var multer = require('multer');
var mkdirp = require('mkdirp');

router.get('/',verify.isAuthenticated, function(req, res, next) {


    var site = {
        title : title,
        desc : desc,
        ApplicantId: req.user.UserId,
        emailId: req.user.email
    }
    console.log("IAM CALEED")
    console.log(site)
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
    console.log('insideeee')
  //  console.log(req.body);
    var userinfo = applicant_mapping(req);
    userinfo["vacancy_id"] = req.body.vacancy_id
    userinfo["ApplicantId"] = req.user.UserId;

    console.log(userinfo);

    models.sequelize.transaction(function (t) {
        return models.candidates_2017.findOne({where: {'ApplicantId' : req.user.UserId, 'vacancy_id' : req.body.vacancy_id}})
            .then(function (v) {

                    if(v) {
                        console.log('found')
                        //console.log(v);
                        console.log(userinfo)
                        return v.update(userinfo);
                    } else {
                        models.candidates_2017.create(userinfo);
                    }

            });
    }).then(function(transaction){

        if(req.body.saveback == true){
            models.sequelize.transaction(tt=>{
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

            }).then(function(transactiont){

                res.send({'data' : '', 'success' : true})

            }).catch(function(errt){
                console.log(errt)
            });
        }
    }).catch(function(err){
        console.log(err);
    });

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
            if(v) {
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



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var dest = './public/images/uploads/'+req.user.email;
        console.log(dest);
        console.log('inside!!')
        mkdirp(dest, function(err){
            if(err) cb(err,dest)
            else cb(null,dest);
        });
    },
    filename: function (req, file, cb) {
        console.log(file);
        if (file.mimetype=='image/png')
        cb(null, file.fieldname +'.jpg')
        else cb(null, file.fieldname + file.originalname.substr(file.originalname.lastIndexOf(".")))
    }
});
var upload = multer({ storage: storage });

router.post('/upload', verify.isAuthenticated, upload.any(), function (req, res) {

    if(req.file ){
        response = {
            'data' : req.file
        }
    } else if(req.files ){
        response = {
            'data' : req.files
        }
    } else {
        console.log(req.files)
        response = {
            'error' : 'Error!'
        }
    }
    res.send(response)
});

module.exports = router;
