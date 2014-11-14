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
var body = new THREE.Mesh(bodyGeometry,bodyMaterial);
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


