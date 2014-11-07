var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  // console.log(req.session.passport.user)
  // console.log("***" + req.session.passport["_JSON"]["profile_image_url"])
  if (req.session.passport.user) {
    var image = req.session.passport.user.profile_image_url
    console.log("*****" + image)
  } else {
    var image = "";
  }

  res.render('index', { title: 'Expressaa', image: image, test: "test" });
});




module.exports = router;


