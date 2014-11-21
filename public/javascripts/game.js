var Game = {
  players: [],
  snowballs: [],
  marks: [],
  explosions: [],
  targets: [],
  totalPoints: 0,
  time: 10
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
  //Move the players
  this.players.forEach(function ( player ) {
    player.update();
  });

  //move snowballs
  this.snowballs.forEach(function ( snowball , i) {
    if( snowball.alive) {
      snowball.update();
    } else {
      scene.remove( snowball.tjs );
    }
  });

  this.updateTarget()
  this.checkTargetCollision();
  this.checkSnowballsHitFloor();

  //explode explosion
  this.explosions.forEach( function ( explosion , i) {
    explosion.update();
  });
  this.time -= 1/60;
  // console.log( this.time)
  $('#time').text(Math.round(this.time) )
  $('#counter').text(Math.round(this.targets[0].counter) );

};

Game.checkSnowballsHitFloor = function () {
  this.snowballs.forEach(function ( snowball ) {
    if( snowball.alive && snowball.crossY ) {
      snowball.kill();
      Game.explosions.push(new ExplodeAnimation(snowball.crossX, 0, snowball.crossZ));
      Game.markHit( snowball.crossX, snowball.crossZ );
    }
  });
};

Game.markHit = function ( x, z ) {
  var newMark = snowball.clone();
  newMark.position.x = x;
  newMark.position.z = z;
  newMark.position.y = -1 + 2*Math.random();
  this.marks.push(newMark);
  scene.add(newMark);
};

Game.createTarget = function ( ) {
  var targetToAdd = {};
  targetToAdd.tjs = target.clone();
  targetToAdd.widthX = targetSize ;
  targetToAdd.widthZ = targetSize ;
  targetToAdd.tjs.position.x = 250 - Math.random() * 500;
  targetToAdd.tjs.position.z = 250 - Math.random() * 500;
  targetToAdd.counter = 20;
  this.targets[0] = targetToAdd ;
  scene.add(targetToAdd.tjs);
};

Game.updateTarget = function () {
  this.targets.forEach(function ( target , i) {
    if(!target.dead) {
      target.counter -= 1/60;
    }
    if(target.counter < 0) {
      target.dead = true;
    }
  });


};

Game.message = function( text ) {
  $('#message').text(text);
};

Game.checkTargetCollision = function () {
  var targetToCheck = this.targets[0];
  this.snowballs.forEach(function ( snowball ) {
    if( !snowball.checkedTargetCollision && snowball.tjs.position.y < 2 && Game.checkCollision( targetToCheck , snowball) ) {
      snowball.checkedTargetCollision = true;
      Game.targets[0].dead = true;
      timePoints = Math.round(targetToCheck.counter * 10)/10;
      distPoints = Math.round(Math.sqrt(Math.pow((snowball.startX - targetToCheck.tjs.position.x),2) + Math.pow((snowball.startZ - targetToCheck.tjs.position.z),2)));
      points = Math.round(timePoints * distPoints);
      Game.message('Hit the target! Time ' + timePoints + ' x distance ' + distPoints +' = ' + points +' points');
      Game.totalPoints += points;
      $('#score').text(Game.totalPoints);
      scene.remove( Game.targets[0].tjs);
      Game.createTarget();
    }
  });
};

Game.checkCollision = function ( rect1, rect2 ) {
 return !(rect1.tjs.position.x + rect1.widthX / 2 <= rect2.tjs.position.x  -  rect2.widthX/2 ||
         rect1.tjs.position.z - rect1.widthZ / 2  >= rect2.tjs.position.z + rect2.widthZ ||
         rect1.tjs.position.x - rect1.widthX / 2 >= rect2.tjs.position.x + rect2.widthX ||
         rect1.tjs.position.z + rect1.widthZ / 2  <= rect2.tjs.position.z - rect2.widthZ);
};







