(function (window, THREE) {

  var TREE_HEIGHT = 60;
  var TRUNK_HEIGHT = 15;

  var treeGeometry = new THREE.CylinderGeometry(0, 20, TREE_HEIGHT, 40);
  var treeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: false
  });
  var tree = new THREE.Mesh(treeGeometry,treeMaterial);
  var trunkGeometry = new THREE.CylinderGeometry(5, 5, TRUNK_HEIGHT, 40);
  var trunkMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false
  });
  var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  tree.position.y = TREE_HEIGHT / 2 + TRUNK_HEIGHT;
  trunk.position.y = TRUNK_HEIGHT / 2;
  tree.castShadow = true;

  var wholeTree = new THREE.Group();
  wholeTree.add(trunk);
  wholeTree.add(tree);
  wholeTree.castShadow = true;

  function Tree () {
    this.mesh = wholeTree.clone();
  }

  window.Tree = Tree;

})(window, window.THREE);
