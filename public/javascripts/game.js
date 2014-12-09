var Game = {
  players: [],
  snowballs: [],
  marks: [],
  explosions: [],
  targets: [],
  totalPoints: 0,
  time: 60
};

Game.createPlayer = function ( id, options ) {
  var newPlayer = new Player(new Snowman(), id, options);
  scene.add(newPlayer.tjs);
  this.players.push(newPlayer);
  this.playerToMove = newPlayer;
};

Game.findPlayer = function( id ) {
  return this.players.filter(function(player) {
    return player.id === id;
  })[0];
};

Game.createPlayers = function ( currentPlayers ) {
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
  this.snowballs.forEach(function ( snowball ) {
    if ( snowball.alive ) {
      snowball.update();
    } else {
      scene.remove(snowball.mesh);
    }
  });

  this.updateTarget();
  this.checkTargetCollision();
  this.checkSnowballsHitFloor();

  //explode explosion
  this.explosions.forEach(function ( explosion ) {
    explosion.update();
  });
  this.time -= 1 / 60;
  $('#time').text(Math.round(this.time));
  $('#counter').text(Math.round(this.targets[0].counter));
  var distanceToTarget = Math.round(
      Math.sqrt(
          Math.pow(
              this.players[0].tjs.position.x - this.targets[0].mesh.position.x,
              2
          ) +
          Math.pow(
              this.players[0].tjs.position.z - this.targets[0].mesh.position.z,
              2
          )
      )
  );
  $('#dist').text(distanceToTarget);
};

Game.checkSnowballsHitFloor = function () {
  this.snowballs.forEach(function ( snowball ) {
    if ( snowball.alive && snowball.crossY ) {
      snowball.kill();
      Game.explosions.push(
          new ExplodeAnimation(snowball.crossX, 0, snowball.crossZ)
      );
      Game.markHit( snowball.crossX, snowball.crossZ );
    }
  });
};

Game.markHit = function ( x, z ) {
  var snowball = new Snowball().mesh;
  snowball.position.x = x;
  snowball.position.z = z;
  snowball.position.y = -1 + 2 * Math.random();
  this.marks.push(snowball);
  scene.add(snowball);
};

Game.createTarget = function ( ) {
  var snowManTarget = new window.Snowman();
  var targetWidthX = window.Snowman.BODY_RADIUS * 2;
  var targetWidthZ = window.Snowman.BODY_RADIUS * 2;
  var targetWidthY = window.Snowman.BODY_RADIUS * 2 + window.Snowman.HEAD_RADIUS * 2;
  snowManTarget.widthX = targetWidthX;
  snowManTarget.widthZ = targetWidthZ;
  snowManTarget.widthY = targetWidthY;
  snowManTarget.position.x = 250 - Math.random() * 500;
  snowManTarget.position.z = 250 - Math.random() * 500;

  snowManTarget.counter = 20;
  this.targets[0] = snowManTarget;
  scene.add(snowManTarget.mesh);
};

Game.updateTarget = function () {
  this.targets.forEach(function ( target ) {
    if ( !target.dead ) {
      target.counter -= 1 / 60;
    }
    if (target.counter < 0) {
      target.dead = true;
    }
  });
};

Game.message = function( text ) {
  $('#message').text(text);
};

Game.checkTargetCollision = function () {
  var snowManTarget = this.targets[0];
  this.snowballs.forEach(function ( snowball ) {
    // if ( !snowball.checkedTargetCollision && snowball.tjs.position.y < 2 && Game.check3dCollision( snowManTarget, snowball) ) {
    if ( !snowball.checkedTargetCollision && Game.check3dCollision(snowManTarget.mesh, snowball.mesh) ) {
      snowball.checkedTargetCollision = true;
      Game.targets[0].dead = true;
      timePoints = Math.round(snowManTarget.counter * 10) / 10;
      distPoints = Math.round(
          Math.sqrt(
              Math.pow(
                  snowball.startX - snowManTarget.position.x,
                  2
              ) +
          Math.pow(
              snowball.startZ - snowManTarget.position.z,
              2
          )
        )
      );
      points = Math.round(timePoints * distPoints);
      Game.message('Hit the target! Time ' + timePoints + ' x distance ' + distPoints + ' = ' + points + ' points');
      Game.totalPoints += points;
      $('#score').text(Game.totalPoints);
      Game.explosions.push(
          new ExplodeAnimation(snowManTarget.position.x, snowManTarget.widthZ / 2, snowManTarget.position.z)
      );
      scene.remove(snowball.tjs);
      scene.remove(Game.targets[0].tjs);
      Game.createTarget();
    }
  });
};

Game.checkCollision = function ( rect1, rect2 ) {
  return !(rect1.tjs.position.x + rect1.widthX / 2 <= rect2.tjs.position.x  -  rect2.widthX / 2 ||
      rect1.tjs.position.z - rect1.widthZ / 2  >= rect2.tjs.position.z + rect2.widthZ ||
      rect1.tjs.position.x - rect1.widthX / 2 >= rect2.tjs.position.x + rect2.widthX ||
      rect1.tjs.position.z + rect1.widthZ / 2  <= rect2.tjs.position.z - rect2.widthZ);
};

Game.check3dCollision = function ( rect1, rect2 ) {
 return !(rect1.position.x + rect1.widthX / 2 <= rect2.position.x  -  rect2.widthX / 2 ||
    rect1.position.z - rect1.widthZ / 2  >= rect2.position.z + rect2.widthZ / 2 ||
    rect1.position.x - rect1.widthX / 2 >= rect2.position.x + rect2.widthX / 2 ||
    rect1.position.z + rect1.widthZ / 2  <= rect2.position.z - rect2.widthZ / 2 ||
    rect1.position.y + rect1.widthY   <= rect2.position.y - rect2.widthY / 2);
};
