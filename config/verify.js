//This file was just to experiment with web tokens . Might help in future.
// used to create, sign, and verify tokens
var jwt = require('jwt-simple');

//configuration for app
var config = require('./config');
var moment = require('moment');
var models = require('../models');

// Checks if user is registered or not.
exports.registeredUser = function(req, res, next) {
  if (!req.header('Authorization')) {
    return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
  }
  var token = req.header('Authorization').split(' ')[1];
  var payload = null;
  try {
    payload = jwt.decode(token, config.TOKEN_SECRET);
  }
  catch (err) {
    return res.status(401).send({ message: err.message });
  }

  if (payload.exp <= moment().unix()) {
    return res.status(401).send({ message: 'Token has expired' });
  }
  console.log(payload);
  req.user = payload.sub;
  next();
}

//Create JWT-Token
 exports.createJWT = function(user) {
  var payload = {
    sub: user.email,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

exports.isAuthenticated = function(req,res,next){
  if (req.isAuthenticated()){
      return next();

  }
  req.flash('loginMessage','Please Log In !!!');
   res.redirect('/');
}

exports.isLoggedIn = function(req,res,next){
  if(!req.isAuthenticated())
    return next();

  res.redirect('/dashboard');
}

exports.isVerified = function(req,res,next){

    models.User.findOne({where:{UserId : req.body.UserId}})
        .then(user=>{


    if(user == null) {
        req.flash('loginMessage', 'Get verified first!')


    } else  if(user.verification == 'true'){
    } else {
        req.flash('loginMessage', 'Get verified first!')

    }
    })
    next();

}
