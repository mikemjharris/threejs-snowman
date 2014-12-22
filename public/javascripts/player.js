(function (window, THREE, Snowman, Snowball) {

  var SNOWBALL_POWER_LIMIT = 10;

  function Player( snowman, id, options ) {
    var self = this;
    this.mesh = snowman.mesh;
    this.id = id;
    this.move = {
      incx: 0,
      incRot: 0
    };
    this.playerName = '';
    this.snowBallPowerUp = false;
    this.snowballPower = 0;
    this.counter = 0;
    this.walkSlowness = 15;
    this.scaleShrinkage = 40;

    if ( options ) {
      this.move = options.move;
      this.playerName = options.playerName;

      if ( options.keysEnabled ) {
        window.addEventListener('keydown', function( event ) {
          switch ( event.keyCode ) {
            case 37: // left
              self.rotateDirection(0.02);
            break;
            case 39: // right
              self.rotateDirection(-0.02);
            break;
            case 38: // up
              self.moveDirection(2);
            break;
            case 40: // down
              self.moveDirection(-2);
            break;
            case 32: // spacebar
              self.snowBallPowerUp = true;
            break;
          }
          // sendUpdate();
        });

        window.addEventListener('keyup', function( event ) {
          switch (event.keyCode) {
            case 37: // left
              self.rotateDirection(0);
            break;
            case 39: // right
              self.rotateDirection(0);
            break;
            case 38: // up
              self.moveDirection(0);
            break;
            case 40: // down
              self.moveDirection(0);
            break;
            case 32: // spacebar
              var snowball = self.makeSnowball(self.snowballPower);
              scene.add(snowball.mesh);
              Game.lastPower = self.snowballPower;
              Game.snowballs.push(snowball);
              self.snowBallPowerUp = false;
              self.snowballPower = 0;
            break;
          }
          // sendUpdate();
        }, false);
      }
    }
  }

  Player.prototype.moveDirection = function( incx ) {
    this.move.incx = incx;
  };

  Player.prototype.rotateDirection = function( rot ) {
    this.move.incRot = rot;
  };

  Player.prototype.update = function() {

    this.mesh.position.x += this.move.incx * Math.sin(this.mesh.rotation.y);
    this.mesh.position.z += this.move.incx * Math.cos(this.mesh.rotation.y);

    this.mesh.rotation.y += this.move.incRot;
    this.mesh.position.y = 0.5 * Math.sin( this.counter / this.walkSlowness );

    this.mesh.scale.set(
      1 + Math.sin(this.counter / this.scaleShrinkage - Math.PI / 2) / this.scaleShrinkage,
      1 + Math.cos(this.counter / this.scaleShrinkage - Math.PI / 2) / this.scaleShrinkage,
      1 + Math.sin(this.counter / this.scaleShrinkage - Math.PI / 2) / this.scaleShrinkage
    );

    this.counter++;

    if ( this.snowBallPowerUp && this.snowballPower < SNOWBALL_POWER_LIMIT ) {
      this.snowballPower += 0.1;
    }
  };

  Player.prototype.makeSnowball = function( power ) {
    return new Snowball(this.id, this.mesh.position, this.mesh.rotation.y, power);
  };

  Object.defineProperty(Player.prototype, 'position', {
    get: function position() {
      return this.mesh.position;
    },
    set: function position( value ) {
      this.mesh.position = value;
    }
  });

  window.Player = Player;

})(window, window.THREE, window.Snowman, window.Snowball);
