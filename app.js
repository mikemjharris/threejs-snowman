var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = []
var passport = require('passport')
var TwitterStrategy = require('passport-twitter').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new TwitterStrategy({
    consumerKey: 'blank',
    consumerSecret: 'blank',
    callbackURL: 'blank'
  },
  function(token, tokenSecret, profile, done) {
    user = profile;
    session.profile = profile
    done(null, profile._json);
    // User.findOrCreate(..., function(err, user) {
      // if (err) { return done(err); }
      // done(null, user);
    // });
  }
));


var routes = require('./routes/index');
var users = require('./routes/users');
var games = require('./routes/games');


var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: '1234567890QWERTY'}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/',
                                     failureRedirect: '/login' }));

app.get('/logout', function (req, res){
  req.session.destroy(function (err) {
    res.redirect('/'); //Inside a callback… bulletproof!
  });
});


app.use('/', games);
app.use('/users', users);
// app.use('/games', games);


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});





module.exports = app;
