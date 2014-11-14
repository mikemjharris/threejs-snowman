var Game = {
  players: [],
  snowballs: [],
  marks: []
};

Game.createPlayer = function ( id , options ) {
  var newPlayer = new Player(mesh.clone(), id, options);
  scene.add(newPlayer.tjs);
  this.players.push(newPlayer);
  this.playerToMove = newPlayer;
};

Game.findPlayer = function( id ){
  return this.players.filter(function(player) {
    return player.id === id;
  })[0];
};

Game.createPlayers = function ( currentPlayers ){
  currentPlayers.forEach(function ( player ) {
    this.createPlayer(player.id, player);
  });
};

Game.update = function () {
  this.players.forEach(function ( player ) {
    player.update();
  });
  this.snowballs.forEach(function ( snowball , i) {
    if( snowball.alive) {
      snowball.update();
    } else {
      scene.remove( snowball.tjs );
    }
  });
  this.checkSnowballsHitFloor()
};

Game.checkSnowballsHitFloor = function () {
  this.snowballs.forEach(function ( snowball ) {
    if( snowball.alive && snowball.crossY ) {
      snowball.kill();
      parts.push(new ExplodeAnimation(snowball.crossX, 0, snowball.crossZ));
      Game.markHit( snowball.crossX, snowball.crossZ );
    }
  });
}

Game.markHit = function ( x, z ) {
  var newMark = snowball.clone();
  newMark.position.x = x
  newMark.position.z = z
  newMark.position.y = -1 + 2*Math.random()
  this.marks.push(newMark)
  scene.add(newMark)



}
