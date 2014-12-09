(function (window, THREE, Snowman) {

  var snowballSize = 2;
  var snowballSpeed = 2;
  var snowballGeometry = new THREE.SphereGeometry(snowBallSize, 30, 30);
  var snowballMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff, wireframe: false
  });

  var _snowballMesh = new THREE.Mesh(snowballGeometry,snowballMaterial);
  _snowballMesh.castShadow = true;

  function Snowball( playerId, position, direction, power ) {
    this.mesh = _snowballMesh.clone();

    if ( arguments.length > 0 ) {
      this.widthX = snowballSize * 2;
      this.widthZ = snowballSize * 2;
      this.widthY = snowballSize * 2;
      this.direction = direction; //equivalent to rotation.y on a threeJS object;
      this.mesh.position.x = position.x + Math.sin(direction - Math.PI / 2) * (Snowman.BODY_RADIUS + 5);
      this.mesh.position.y = Snowman.BODY_RADIUS + 1;
      this.mesh.position.z = position.z + Math.cos(direction - Math.PI / 2) * (Snowman.BODY_RADIUS + 5);
      this.id = playerId;
      this.speedY = power;

      this.startX = this.mesh.position.x;
      this.startZ = this.mesh.position.z;
      this.snowballSpeed = power;
      this.crossY = false;
      this.crossX = 0;
      this.crossZ = 0;
      this.alive = true;
    }
  }

  Snowball.prototype.update = function () {
    this.mesh.position.x += Math.sin(this.direction) * this.snowballSpeed;
    this.mesh.position.z += Math.cos(this.direction) * this.snowballSpeed;
    this.mesh.position.y += this.speedY;
    this.speedY -= 0.1;

    console.log(this.mesh.position);

    if ( !this.crossY && this.mesh.position.y <= 0 ) {
      this.crossY = true;
      this.crossX = this.mesh.position.x;
      this.crossZ = this.mesh.position.z;
    }
  };

  Snowball.prototype.kill = function () {
    this.alive = false;
  };

  window.Snowball = Snowball;
})(window, window.THREE, window.Snowman);
