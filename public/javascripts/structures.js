// Object variables initialized
var planeSize = 1000;

//init THREE.js scene
var scene = new THREE.Scene();

//Geometries
var planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);

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

var highlightRadius = Snowman.BODY_RADIUS,
highlightMaterial = new THREE.MeshLambertMaterial({
  color: 0x0000ff
});
var highlightGeometry = new THREE.CylinderGeometry(Snowman.BODY_RADIUS, Snowman.BODY_RADIUS, 1, 30);
var highlight  = new THREE.Mesh(highlightGeometry, highlightMaterial);
highlight.rotation.x = Math.PI;
