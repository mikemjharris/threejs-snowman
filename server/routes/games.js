module.exports = function ( app ) {

  app.get('/snowman', function( req, res ) {
    res.render('snowman.html');
  });

}

