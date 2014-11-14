var snowBallSize = 2
var snowballSpeed = 5
var snowballGeometry = new THREE.SphereGeometry(snowBallSize,30,30);
var snowballMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});

function Snowball( playerId, position, direction) {
  this.tjs = new THREE.Mesh(snowballGeometry,snowballMaterial);
  this.direction = direction; //equivalent to rotation.y on a threeJS object;
  this.tjs.position.x = position.x + Math.sin(direction)*bodyRadius;
  this.tjs.position.y = bodyRadius;
  this.tjs.position.z = position.z + Math.cos(direction)*bodyRadius;
  this.id = playerId;
  scene.add( this.tjs );
}

Snowball.prototype.update = function () {
  this.tjs.position.x += Math.sin(this.direction)*snowballSpeed;
  this.tjs.position.z += Math.cos(this.direction)*snowballSpeed;
};
