// config/auth.js
//This is separate module for passport Authentication.
var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
var nodemail = require('./nodemail');

module.exports = function(passport){
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.UserId);
  });
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      models.User.findOne({where:{UserId:id}}).then(user=>{done(null,user)})
  });

  passport.use('local-signup', new LocalStrategy({
      // by default, local strategy uses username and password, we will override with email
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback : true // allows us to pass back the entire request to the callback
  },
  function(req, email, password, done) {
      // User.findOne wont fire unless data is sent back
      process.nextTick(function() {
      models.User.findOne({where:{email:req.body.email}
      }).then(user=>{
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // create the user
            var newUser = {};
            var verificationCode = Math.floor(100000000 + Math.random() * 900000000);
            console.log(verificationCode);
            // set the user's local credentials
            newUser.email    = email;
            newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
            newUser.name = req.body.name;
            newUser.verification = verificationCode;
            console.log("NEW USER")
            console.log(newUser)
            // save the user
            //Transaction started.
            models.sequelize.transaction(t=>{
              //Transaction Is used for only one session per user.
              return models.tempUser.create(newUser).then(user=>{
                console.log(user);
                //req.flash('verify' , 'Please verify your Email. Link sent to your email');
                //setup email data with unicode symbols
                var mailOptions = {
                    from: '"GGSIPU Jobs Portal 👻" <ggsipu.jobs@ggsipu.com>', // sender address
                    to: email, // list of receivers
                    subject: 'Accout Verifcation Code on GGSIPU Jobs Portal', // Subject line
                    //text: 'Hello world ?', // plain text body
                    html: '<p>Please verify your account using this verification code.</p><br><b>Verifcation Code: '+verificationCode+'</b>' // html body
                };

                //Calling nodemailer for email sending.
                nodemail(mailOptions);

                return done(null,false);
              }).catch(function(err){
                console.log("Error Occurred: "+err);
                return done(null,false,req.flash('signupMessage','Error Occurred!!'));
              });

            }).then(function(transaction){
              console.log("Transaction : "+ transaction);

            }).catch(function(err){
              console.log(err);

            });
            //Transaction ended.
        }

      });

  })

}));
  passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req,username, password, done) {

        //Transaction started.
        models.sequelize.transaction(t=>{
          //Transaction Is used for only one session per user.
          return models.User.findOne({where:{email:username}}).then(user=>{
                console.log("User is here login: "+user);
                if (!user){
                 return models.tempUser.findOne({where:{email:username}}).then(user=>{
                   if(!user)
                     return done(null,false, req.flash('loginMessage','User is not registered.'));
                   else if(!user.isVerified)
                     return done(null,false, req.flash('verify','Please verify your account'));
                 });
               }
                else if (!bcrypt.compareSync(password,user.password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
                return done(null, user);
          });

        }).then(function(transaction){
          console.log("Transaction : "+ transaction);

        }).catch(function(err){
          console.log(err);

        });
        //Transaction ended.

    }));
};
