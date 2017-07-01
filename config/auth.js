// config/auth.js
//This is separate module for passport Authentication.

var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');
var bcrypt = require('bcrypt-nodejs');
module.exports = function(passport){


  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
      done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
      models.User.findOne({where:{id:id}}).then(user=>{done(null,user)})
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
            // set the user's local credentials
            newUser.email    = email;
            newUser.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8),null);
            newUser.name = req.body.name;
            newUser.confirm_password = 'none';
            // save the user
            models.User.create(newUser).then(user=>{
              console.log(user);
              req.flash('verify' , 'Please verify your Email. Link sent to your email');
              return done(null,user);
            });
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
        models.User.findOne({where:{email:username}}).then(user=>{
              console.log("User is here login");
              if (!user)
                  return done(null, false, req.flash('loginMessage', 'No user found.'));

              if (!bcrypt.compareSync(password,user.password))
                  return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

              return done(null, user);


        });
    }));

};
