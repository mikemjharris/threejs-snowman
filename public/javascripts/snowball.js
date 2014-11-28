var snowballSize = 2;
var snowballSpeed = 2;
var snowballGeometry = new THREE.SphereGeometry(snowBallSize,30,30);
var snowballMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffff, wireframe: false
});
var snowball = new THREE.Mesh(snowballGeometry,snowballMaterial);
snowball.castShadow = true;

function Snowball( playerId, position, direction, power ) {
  this.tjs = snowball.clone();
  this.widthX = snowballSize * 2;
  this.widthZ = snowballSize * 2;
  this.widthY = snowballSize * 2;
  this.direction = direction; //equivalent to rotation.y on a threeJS object;
  this.tjs.position.x = position.x + Math.sin(direction - Math.PI / 2) * (bodyRadius + 5);
  this.tjs.position.y = bodyRadius + 1;
  this.tjs.position.z = position.z + Math.cos(direction - Math.PI / 2) * (bodyRadius + 5);
  this.id = playerId;
  this.speedY = power;

  this.startX = this.tjs.position.x;
  this.startZ = this.tjs.position.z;
  this.snowballSpeed = power;
  this.crossY = false;
  this.crossX = 0;
  this.crossZ = 0;
  this.alive = true;
  scene.add(this.tjs);
}

Snowball.prototype.update = function () {
  this.tjs.position.x += Math.sin(this.direction) * this.snowballSpeed;
  this.tjs.position.z += Math.cos(this.direction) * this.snowballSpeed;
  this.tjs.position.y += this.speedY;
  this.speedY -= 0.1;

  if ( !this.crossY && this.tjs.position.y <= 0 ) {
    this.crossY = true;
    this.crossX = this.tjs.position.x;
    this.crossZ = this.tjs.position.z;
  }
};

Snowball.prototype.kill = function () {
  this.alive = false;
};
