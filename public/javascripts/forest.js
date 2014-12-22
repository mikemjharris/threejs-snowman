(function (window, THREE) {

  var NOS_TREES = 400;
  var forest = new THREE.Group();

  for ( var i = 0; i < NOS_TREES; i++ ) {
    var tree = new window.Tree();
    var sign = Math.random() < 0.5 ? -1 : 1;
    if ( i < NOS_TREES / 2 ) {
      tree.mesh.position.x = Math.random() * ( window.Arena.PLANE_SIZE * 0.4 ) * sign;
      tree.mesh.position.z = ( window.Arena.PLANE_SIZE / 2 ) - Math.random() * 50;
      if ( i < NOS_TREES / 4 ) {
        tree.mesh.position.z *= -1;
      }
    } else {
      tree.mesh.position.z = Math.random() * ( window.Arena.PLANE_SIZE * 0.4 ) * sign;
      tree.mesh.position.x = window.Arena.PLANE_SIZE / 2 - Math.random() * 50;
      if ( i < NOS_TREES * 3 / 4 ) {
        tree.mesh.position.x *= -1;
      }
    }

    var treeScale = ( Math.random() + 0.5 ) * 1;
    tree.mesh.scale.set(treeScale, treeScale, treeScale);
    forest.add(tree.mesh);
  }

  function Forest() {
    this.mesh = forest;
  }

  window.Forest = Forest;

})(window, window.THREE);
