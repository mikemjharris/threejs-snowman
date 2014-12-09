(function (window, THREE, Snowman, Snowball) {

  function Player( id, options ) {
    this.mesh = new Snowman().mesh;
    this.id = id;
    this.move = {
      incx: 0,
      incRot: 0
    };
    this.playerName = '';

    if ( options ){
      if ( options.move ) {
        this.move = options.move;
      }
      if ( options.playerName ) {
        this.playerName = options.playerName;
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
  };

  Player.prototype.makeSnowball = function( power ) {
    return new Snowball(this.id, this.mesh.position, this.mesh.rotation.y, power);
  };

  window.Player = Player;

})(window, window.THREE, window.Snowman, window.Snowball);
