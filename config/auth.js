//This is separate module for passport Authentication.
// config/auth.js

var LocalStrategy   = require('passport-local').Strategy;
var models = require('../models');

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
      models.User.findOne({where:{email:req.body.username}
      }).then(user=>{
        if (user) {
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        } else {

            // create the user
            var newUser = {};
            console.log(req.body);
            // set the user's local credentials
            newUser.email    = email;
            newUser.password = password;//newUser.generateHash(password);
            newUser.name = req.body.name;
            newUser.confirm_password = password;
            // save the user
            models.User.create(newUser).then(user=>{
              console.log(user);
              return done(null,user);
            });
        }

      });


      });

  }));

};
