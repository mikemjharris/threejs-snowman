var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
   if (req.session.passport.user) {
    var user = req.session.passport.user
  } else {
    var user = "";
  }
  console.log(req.session.passport.user)
  res.render('small_game_test', {  user: user });
});

router.get('/jade', function(req, res) {
  res.render('canvas_game')
});

router.get('/snowman', function(req, res) {
  res.render('snowman')
});

router.get('/small', function(req, res) {
  if (req.session.passport.user) {
    var user = req.session.passport.user
  } else {
    var user = "";
  }
  console.log(req.session.passport.user)
  res.render('small_game_test', {  user: user });
});



module.exports = router;
