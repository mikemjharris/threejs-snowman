(function (window, THREE) {

  function FollowCamera ( player ) {
    this.player = player;
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  FollowCamera.prototype.update = function() {
    this.camera.position.x = this.player.mesh.position.x - 40 * Math.sin(this.player.mesh.rotation.y);
    this.camera.position.z = this.player.mesh.position.z - 40 * Math.cos(this.player.mesh.rotation.y);
    this.camera.position.y = 60;
    var toLookat = this.player.mesh.position.clone();
    toLookat.x = toLookat.x + 100 * Math.sin(this.player.mesh.rotation.y);
    toLookat.z = toLookat.z + 100 * Math.cos(this.player.mesh.rotation.y);
    this.camera.lookAt(toLookat);
  };

  window.FollowCamera = FollowCamera;

})(window, window.THREE);

