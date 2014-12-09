// Object variables initialized
var snowBallSize = 2;
var planeSize = 1000;

//init THREE.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0xEEEEEE));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

//Geometries
// var snowballGeometry = new THREE.SphereGeometry(snowBallSize,30,30);
var planeGeometry = new THREE.PlaneGeometry(planeSize,planeSize);

//Materials
// var snowballMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xcccccc
});

//Create objects
var plane = new THREE.Mesh(planeGeometry, planeMaterial);


plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 0;
plane.position.y = 0;
plane.position.z = 0;
plane.receiveShadow = true;

// add the sphere to the scene
scene.add(plane);

var treeHeight = 60;
var trunkHeight = 15;

var treeGeometry = new THREE.CylinderGeometry(0, 20, treeHeight, 40);
var treeMaterial = new THREE.MeshLambertMaterial({
  color: 0x00ff00,
  wireframe: false
});
var tree = new THREE.Mesh(treeGeometry,treeMaterial);
var trunkGeometry = new THREE.CylinderGeometry(5, 5, trunkHeight, 40);
var trunkMaterial = new THREE.MeshLambertMaterial({
  color: 0x000000,
  wireframe: false
});
var trunk = new THREE.Mesh(trunkGeometry,trunkMaterial);

tree.position.y = treeHeight / 2 + trunkHeight;
trunk.position.y = trunkHeight / 2;
tree.castShadow = true;

var wholeTree = new THREE.Group();
wholeTree.add(trunk);
wholeTree.add(tree);
wholeTree.castShadow = true;
wholeTree.position.x = 100;
wholeTree.position.z = 100;

scene.add(wholeTree);

var cubeSide = 10;
var cubeGeometry = new THREE.BoxGeometry(cubeSide,cubeSide,cubeSide);
var cubeMaterial = new THREE.MeshLambertMaterial({
  map: THREE.ImageUtils.loadTexture('../images/m.gif')
});
var cubes = [];

var nosCubes = 2;
var cubePositions = [
  [20, 30],
  [50, 55],
  [0, 100],
  [120, 10],
  [-120, 10],
  [-100, -40],
  [-140, 70],
  [-60, 130]
];
for (var i = 0; i < cubePositions.length; i++) {
    cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // randX = Math.random() * 500 - 250;
    // randZ = Math.random() * 500 - 250;
    randX = cubePositions[i][0];
    randZ = cubePositions[i][1];
    cubes[i].position.x = randX;
    cubes[i].position.y = Math.random() * cubeSide / 2 ;
    cubes[i].position.z = randZ;
    cubes[i].castShadow = true;
    scene.add(cubes[i]);
}

// var cubebigSide = 10
var bigCubeGeometry = new THREE.BoxGeometry(50,50,300);
var bigCubeMaterial = new THREE.MeshLambertMaterial({
  map: THREE.ImageUtils.loadTexture('../images/mammal_logo.jpg')
});
var bigCube = new THREE.Mesh(bigCubeGeometry, bigCubeMaterial);
bigCube.position.y = 100;
bigCube.position.x = 0;
bigCube.position.z = -300;
bigCube.rotation.y = Math.PI / 2;

scene.add(bigCube);

var highlightRadius = Snowman.BODY_RADIUS,
highlightMaterial = new THREE.MeshLambertMaterial({
  color: 0x0000ff
});
var highlightGeometry = new THREE.CylinderGeometry(Snowman.BODY_RADIUS, Snowman.BODY_RADIUS, 1, 30);
var highlight  = new THREE.Mesh(highlightGeometry, highlightMaterial);
highlight.rotation.x = Math.PI;
