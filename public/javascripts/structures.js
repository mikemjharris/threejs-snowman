// Object variables initialized
var snowBallSize = 2;
var hatHeight = 6;
var hatRimHeight = 1;
var bodyRadius = 9;
var headRadius = 4;
var nosButtons = 3;
var buttons = [];
var buttonRadius = 1;
var eyes = [];
var eyeRadius = 0.5;
var noseHeight = 3;
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
var bodyGeometry = new THREE.SphereGeometry(bodyRadius,30,30);
var headGeometry = new THREE.SphereGeometry(headRadius,30,30);
var hatGeometry = new THREE.CylinderGeometry(3, 3, hatHeight, 40);
var hatRimGeometry = new THREE.CylinderGeometry(4, 4, hatRimHeight, 40);
var eyeGeometry = new THREE.SphereGeometry(eyeRadius,30,30);
var buttonGeometry = new THREE.SphereGeometry(buttonRadius,30,30);

//Materials
// var snowballMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var planeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc });
var bodyMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var headMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var hatMaterial = new THREE.MeshLambertMaterial({color: 0x333333, wireframe: false});
var eyeMaterial = new THREE.MeshLambertMaterial({color: 0x666666, wireframe: false});
var buttonMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false});
var armMaterial = new THREE.LineBasicMaterial({ color: 0xA52A2A });

//Create objects
var plane = new THREE.Mesh(planeGeometry,planeMaterial);
var body = new THREE.Mesh(bodyGeometry,bodyMaterial); var body = new THREE.Mesh(bodyGeometry,bodyMaterial);
var head = new THREE.Mesh(headGeometry,headMaterial);
var hat = new THREE.Mesh(hatGeometry, hatMaterial);
var hatRim = new THREE.Mesh(hatRimGeometry, hatMaterial);

for (var i = 0; i < nosButtons; i++ ) {
  buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);
  var buttonAngle = (i+3)*Math.PI / 6;
  buttons[i].position.x = 0;
  buttons[i].position.y =  bodyRadius * ( 1 - Math.cos( buttonAngle) );
  buttons[i].position.z = bodyRadius * Math.sin( buttonAngle) + buttonRadius * 0.8;
  buttons[i].castShadow = true;
}

for (var i = 0; i < 2; i++) {
  eyes[i] = new THREE.Mesh(eyeGeometry,eyeMaterial);
  eyeAngelZ =   Math.PI * 3/8;
  eyeAngelXY =  Math.PI * 5/8;
  //todo - the maths here isn't right.
  eyes[i].position.x =  (-1 + 2*i)*headRadius * Math.cos((-1 + 2*i)*eyeAngelZ) + eyeRadius*(-1 + 2*i)/5;
  eyes[i].position.z = headRadius + eyeRadius + Math.cos(eyeAngelXY) * Math.sin(  eyeAngelZ )*headRadius;
  eyes[i].position.y = bodyRadius * 2 + headRadius + Math.sin(eyeAngelXY) * Math.cos(  eyeAngelZ )*headRadius;
}

var arm1Geometry = new THREE.Geometry();
arm1Geometry.vertices.push(new THREE.Vector3(0, bodyRadius, 0));
arm1Geometry.vertices.push(new THREE.Vector3(bodyRadius * 1.5, bodyRadius* 1.5, 0));
arm1Geometry.vertices.push(new THREE.Vector3(bodyRadius * 1.7, bodyRadius * 2, 0));

var arm2Geometry = new THREE.Geometry();
arm2Geometry.vertices.push(new THREE.Vector3(0 , bodyRadius  , 0));
arm2Geometry.vertices.push(new THREE.Vector3(-bodyRadius * 1.5 , bodyRadius* 1.5, 0));
arm2Geometry.vertices.push(new THREE.Vector3(-bodyRadius * 1.7, bodyRadius * 2, 0));

var arm1 = new THREE.Line(arm1Geometry, armMaterial);
var arm2 = new THREE.Line(arm2Geometry, armMaterial);
var nose = new THREE.Mesh(new THREE.CylinderGeometry(1, 0, noseHeight, 40), new THREE.MeshLambertMaterial({ color: 0xFFA500, wireframe: false }));

nose.rotation.z =  Math.PI / 2;
nose.rotation.y =  Math.PI * 1.5;
nose.position.z = headRadius + noseHeight / 2;
nose.position.y = bodyRadius * 2  +  headRadius;

hat.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatHeight / 2;
hatRim.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatRimHeight / 2;

plane.rotation.x=-0.5*Math.PI;
plane.position.x=0;
plane.position.y=0;
plane.position.z=0;
plane.receiveShadow = true;

body.castShadow = true;
body.position.x=0;
body.position.y=bodyRadius;
body.position.z=0;
// body.castShadow = true;

head.position.x=0;
head.position.y= (parseInt(bodyRadius)*2 + parseInt(headRadius));
head.position.z=0;

//Create snowman
mesh = new THREE.Group();
mesh.add(body);
mesh.add(head);
mesh.add(arm1);
mesh.add(arm2);
mesh.add(hat);
mesh.add(hatRim);
mesh.add(nose);
for( var i = 0 ; i < buttons.length;  i++) {
  mesh.add(buttons[i]);
}
for( var j = 0; j < eyes.length ; j++) {
  mesh.add(eyes[j]);
}
mesh.castShadow = true;
// add the sphere to the scene
scene.add(plane);


var treeHeight  = 60
var trunkHeight  = 15

var treeGeometry = new THREE.CylinderGeometry(0, 20, treeHeight, 40);
var treeMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false});
var tree = new THREE.Mesh(treeGeometry,treeMaterial);
var trunkGeometry = new THREE.CylinderGeometry(5, 5, trunkHeight, 40);
var trunkMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false});
var trunk = new THREE.Mesh(trunkGeometry,trunkMaterial);

tree.position.y = treeHeight/2 + trunkHeight
trunk.position.y = trunkHeight/2
tree.castShadow = true

var wholeTree = new THREE.Group();
wholeTree.add(trunk);
wholeTree.add(tree);
wholeTree.castShadow = true;
wholeTree.position.x = 100;
wholeTree.position.z = 100;

scene.add(wholeTree)




var cubeSide = 10
var cubeGeometry = new THREE.BoxGeometry(cubeSide,cubeSide,cubeSide);
var cubeMaterial = new THREE.MeshLambertMaterial({
  map: THREE.ImageUtils.loadTexture('../images/m.gif')
});
var cubes = []


var nosCubes = 2
var cubePositions = [[20,30], [50,55], [0,100],[120,10], [-120,10], [-100,-40], [-140,70], [-60,130]]
for (var i = 0; i < cubePositions.length; i++) {
    cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    // randX = Math.random() * 500 - 250;
    // randZ = Math.random() * 500 - 250;
    randX = cubePositions[i][0]
    randZ = cubePositions[i][1]
    cubes[i].position.x=randX;
    cubes[i].position.y= Math.random() * cubeSide/2 ;
    cubes[i].position.z=randZ;
    cubes[i].castShadow = true;


    scene.add(cubes[i]);
}


  // var cubebigSide = 10
  var bigCubeGeometry = new THREE.BoxGeometry(50,50,300);
  var bigCubeMaterial = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('../images/mammal_logo.jpg')
  });
  var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
  bigCube.position.y = 100;
  bigCube.position.x = 0;
  bigCube.position.z = -300;
  bigCube.rotation.y = Math.PI/2;

  scene.add( bigCube );

  mesh.castShadow = true;


var highlightRadius   = bodyRadius,
    highlightMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff } ),
    highlightGeometry = new THREE.CylinderGeometry(bodyRadius, bodyRadius, 1, 30);
var highlight  = new THREE.Mesh( highlightGeometry, highlightMaterial )
    highlight.rotation.x = Math.PI



var targetSize   = 30,
    targetMaterial = new THREE.MeshLambertMaterial( { color: 0xff0000 } ),
    targetGeometry = new THREE.BoxGeometry(targetSize,2,targetSize);
// var target  = new THREE.Mesh( targetGeometry, targetMaterial )
  var target = mesh.clone()
  var targetWidthX = bodyRadius * 2
  var targetWidthZ = bodyRadius * 2
  var targetWidthY = bodyRadius * 2 + headRadius * 2;
    // target.rotation.x = Math.PI


