var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/snoamn-multi', function(req, res) {
    res.render('snowman');
});

module.exports = router;
