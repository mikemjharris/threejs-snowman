var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

const fs = require('fs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../node_modules')));

require('./routes/games')(app);

app.get('*', function ( req, res, next ) {
  res.redirect('../');
});

app.use(function (req, res, next ) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
  app.use(function ( err, req, res ) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function ( err, req, res ) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



app.set('port', process.env.PORT || 8000);

const httpServer = require('http').createServer(app);

const { Server } = require('socket.io');
const io = new Server(httpServer, {
  cors: {
    origin: ["*"],
  }
});

var scores = [];

fs.readFile('./data/scores.json', 'utf8' , (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  console.log(data)
  scores = JSON.parse(data);
})

httpServer.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
  io.sockets.on('connection', function(socket) {

    socket.emit('connected', scores);

    socket.on('single-score', function ( score ) {
      scores.push(score);
      socket.emit('topscores' , scores);

      fs.writeFile('./data/scores.json', JSON.stringify(scores), (err) => {
        if (err) {
          console.error(err)
          return
        }
        console.log('File has been created')
      });
    });
  });
});



