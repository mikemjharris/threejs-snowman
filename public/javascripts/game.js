var Game = {
  players: [],
  snowballs: []
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
  this.snowballs.forEach(function ( snowball ) {
    snowball.update();
  });
};
