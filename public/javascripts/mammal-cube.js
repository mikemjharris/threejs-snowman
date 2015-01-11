(function (window, THREE) {

  var CUBE_SIDE = 10;
  var cubeGeometry = new THREE.BoxGeometry(CUBE_SIDE, CUBE_SIDE, CUBE_SIDE);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('../images/m.gif')
  });

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  function MammalCube() {
    this.mesh = cube.clone();
  }

  MammalCube.CUBE_SIDE = CUBE_SIDE;

  window.MammalCube = MammalCube;

})(window, window.THREE);
