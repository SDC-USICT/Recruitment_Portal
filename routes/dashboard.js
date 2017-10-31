var express = require('express');
var router = express.Router();
var verify = require('../config/verify');
var applicant_mapping = require('../config/applicant_mapping');
var models = require('../models')
var multer = require('multer');
var mkdirp = require('mkdirp');
var models = require('../models');
var nodemail = require('../config/nodemail');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');

router.get('/',verify.isAuthenticated, function(req, res, next) {
  var site = {
        title : title,
        desc : desc,
        ApplicantId: req.user.UserId,
        emailId: req.user.email,
        role: req.user.role
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
              res.send('Successfully Transferred!')

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
                    }
                    else if(req.body.vacancy_id!==null) {

                        models.candidates_2017.create(userinfo).then(userinfo=>{

                          //Mapping values for successfull application to email.
                          var site = {};
                          site.name = userinfo.FirstName;
                          site.post = userinfo.vacancy_id;
                          site.school = 'USICT';
                          site.reg = userinfo.regId;
                          site.post = userinfo.vacancy_id;
                          site.school = 'USICT';
                          site.department = 'CSE/IT';

                          var file = path.join(__dirname, '..', 'views', 'successemail.html');
                          fs.readFile(file, 'utf8', function (err,data) {
                                  if (err) {
                                    return console.log(err);
                                  }
                                  console.log("FS Data");
                                  var data = ejs.render(data, {site: site});
                                  var email = req.user.email;
                                  //setup email data with unicode symbols
                                  var mailOptions = {
                                      from: '"GGSIPU Jobs Portal 👻" <ggsipu.jobs@ggsipu.com>', // sender address
                                      to: email, // list of receivers
                                      subject: 'Application Successfully Submitted to GGSIPU Jobs Portal.', // Subject line
                                      //text: 'Hello world ?', // plain text body
                                      html: data // html body
                                  };

                                  //Calling nodemailer for email sending.
                                  nodemail(mailOptions);

                                });


                        });
                    }
                    else {
                      res.sendStatus(400);
                      throw new Error();
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
