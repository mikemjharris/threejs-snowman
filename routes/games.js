var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/snowman-multi', function(req, res) {
    res.render('snowman');
});

module.exports = router;
