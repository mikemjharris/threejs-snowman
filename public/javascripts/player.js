function Player( threeJSObject , id , options) {
  this.tjs = threeJSObject;
  this.id = id;
  this.move = {
      incx: 0,
      incRot: 0
    };
  this.playerName = '';

  if( options ){
    if( options.move ) {
      this.move = options.move;
    }
    if( options.playerName) {
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
  // this.old.x = this.tjs.position.x
  // this.old.z = this.tjs.position.z

  this.tjs.position.x += this.move.incx * Math.sin(this.tjs.rotation.y);
  this.tjs.position.z += this.move.incx * Math.cos(this.tjs.rotation.y);
  this.tjs.rotation.y += this.move.incRot;
};

Player.prototype.fireSnowball = function( power ) {
  var newSnowball = new Snowball( this.id, this.tjs.position, this.tjs.rotation.y, power);
  Game.lastPower = power;
  Game.snowballs.push( newSnowball );
};

