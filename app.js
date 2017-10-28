var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var adminPassport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');
var LocalStrategy = require('passport-local').Strategy;

//Website Meta Details.
title = "Recruitment Portal";
desc = "Online Portal to apply for various posts at GGSIP University";
//Express app created.
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({secret:"iamsurenderwebdeveloper"}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//importing routes.
var index = require('./routes/index');
var dashboard = require('./routes/dashboard');
//var admin = require('./routes/admin/index');
var adminDashboard = require('./routes/admin/dashboard');


//Using different routes
app.use('/', index);
app.use('/dashboard', dashboard);
//app.use('/admin', admin);
app.use('/admin/dashboard', adminDashboard);

require('./config/auth')(passport);
require('./config/auth')(adminPassport);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
