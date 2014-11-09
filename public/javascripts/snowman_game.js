// varibales initialized
var incx = 0
var incz = 0
var incRot = 0
var snowballs = []
var snowBallSize = 2
var snowballSpeed = 5
var snowmanSpeed = 2
var cameraY = 0
var cameraRotate = 0
var cameraRotateInc = 0
var cameraZoom = 0
var hatHeight = 6
var hatRimHeight = 1
var bodyRadius = 9
var headRadius = 4
var x = 0
var targetRadius = 5
var nosButtons = 3
var buttons = []
var buttonRadius = 1
var eyes = []
var eyeRadius = 0.5
var noseHeight = 3
var light;
var socket = io.connect(window.location.hostname);
var playerSocketId
var players = {}

//init THREE.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
       
//Geometries
var snowballGeometry = new THREE.SphereGeometry(snowBallSize,30,30);
var planeGeometry = new THREE.PlaneGeometry(500,500);
var bodyGeometry = new THREE.SphereGeometry(bodyRadius,30,30);
var headGeometry = new THREE.SphereGeometry(headRadius,30,30);
var hatGeometry = new THREE.CylinderGeometry(3, 3, hatHeight, 40)
var hatRimGeometry = new THREE.CylinderGeometry(4, 4, hatRimHeight, 40)
var eyeGeometry = new THREE.SphereGeometry(eyeRadius,30,30);
var buttonGeometry = new THREE.SphereGeometry(buttonRadius,30,30);
//Materials 
var snowballMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff });
var bodyMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var headMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
var hatMaterial = new THREE.MeshLambertMaterial({color: 0x333333, wireframe: false})              
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
  buttonAngle = (i+3)*Math.PI / 6
  buttons[i].position.x = 0
  buttons[i].position.y =  bodyRadius * ( 1 - Math.cos( buttonAngle) )
  buttons[i].position.z = bodyRadius * Math.sin( buttonAngle) + buttonRadius * 0.8
  buttons[i].castShadow = true;
}

for (var i = 0; i < 2; i++) {
  eyes[i] = new THREE.Mesh(eyeGeometry,eyeMaterial);
  eyeAngelZ =   Math.PI * 3/8
  eyeAngelXY =  Math.PI * 5/8
  //todo - the maths here isn't right.
  eyes[i].position.x =  (-1 + 2*i)*headRadius * Math.cos((-1 + 2*i)*eyeAngelZ) + eyeRadius*(-1 + 2*i)/5
  eyes[i].position.z = headRadius + eyeRadius + Math.cos(eyeAngelXY) * Math.sin(  eyeAngelZ )*headRadius
  eyes[i].position.y = bodyRadius * 2 + headRadius + Math.sin(eyeAngelXY) * Math.cos(  eyeAngelZ )*headRadius;
}

  var arm1Geometry = new THREE.Geometry();
  arm1Geometry.vertices.push(new THREE.Vector3(0 , bodyRadius  , 0));
  arm1Geometry.vertices.push(new THREE.Vector3(bodyRadius * 1.5 , bodyRadius* 1.5, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(bodyRadius * 1.7, bodyRadius * 2, 0));

  var arm2Geometry = new THREE.Geometry();
  arm2Geometry.vertices.push(new THREE.Vector3(0 , bodyRadius  , 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-bodyRadius * 1.5 , bodyRadius* 1.5, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-bodyRadius * 1.7, bodyRadius * 2, 0));

  var arm1 = new THREE.Line(arm1Geometry, armMaterial);
  var arm2 = new THREE.Line(arm2Geometry, armMaterial);
          


  var nose = new THREE.Mesh(new THREE.CylinderGeometry(1, 0, noseHeight, 40), new THREE.MeshLambertMaterial({color: 0xFFA500, wireframe: false}));     
  nose.rotation.z =  Math.PI / 2
  nose.rotation.y =  Math.PI * 1.5
  nose.position.z = headRadius + noseHeight / 2
  nose.position.y = bodyRadius * 2  +  headRadius


  // hat.overdraw = true;
  hat.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatHeight / 2
  hatRim.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatRimHeight / 2

plane.rotation.x=-0.5*Math.PI;
plane.position.x=0
plane.position.y=0
plane.position.z=0
plane.receiveShadow = true;

body.castShadow = true;
body.position.x=0;
body.position.y=bodyRadius;
body.position.z=0;
body.castShadow = true;

head.position.x=0;
head.position.y= (parseInt(bodyRadius)*2 + parseInt(headRadius));
head.position.z=0;
        

function fireSnowball( player ) {
  snowballs.push( new THREE.Mesh(snowballGeometry,snowballMaterial));
  snowballs[snowballs.length -1].direction =  player.rotation.y
  snowballs[snowballs.length -1].position.x = player.position.x + Math.sin(snowballs[snowballs.length -1].direction)*bodyRadius;
  snowballs[snowballs.length -1].position.y = bodyRadius
  snowballs[snowballs.length -1].position.z = player.position.z + Math.cos(snowballs[snowballs.length -1].direction)*bodyRadius;
  scene.add(snowballs[snowballs.length - 1])
}

  function compareRect(R1, R2) {
   return !(R1.x+ bodyRadius*2  <= R2.x + cubeSide/ 2 ||
           R1.z - bodyRadius*2  >= R2.z - cubeSide/2 ||
           R1.x >= R2.x + cubeSide ||
           R1.z + bodyRadius*2  <= R2.z + cubeSide/2);
  }

  function eventListeners () {
    window.addEventListener('keydown', function(event) {
      console.log('called')
      socket.emit('update')
      switch (event.keyCode) {
        case 87: // W
          cameraRotateInc = 1
          break;
        case 83: // Left
          cameraRotateInc = -1
          break;
        case 68: // E
          cameraY = 5
          break;
        case 69: // D
          cameraY = -5
          break;
        case 82: // R
          cameraZoom = 1
          break;
        case 70: // F
          cameraZoom = -1
          break;
        case 37: // left
          players[playerSocketId].move.incRot =  Math.min(players[playerSocketId].move.incRot + 0.1,  0.1)
          break;
        case 39: // right
          players[playerSocketId].move.incRot =  Math.max(players[playerSocketId].move.incRot - 0.1,  -0.1)
          break;
        case 38: // up
          players[playerSocketId].move.incx =  Math.min(players[playerSocketId].move.incx + 1,  1)
          break;
        case 40: // down
          players[playerSocketId].move.incx =  Math.max(players[playerSocketId].move.incRot - 1,  -1)
          break;
        case 32: // spacebar
          fireSnowball( players[playerSocketId] )
          break;
        }
      }, false)

   window.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 37: // left
        players[playerSocketId].move.incRot =  Math.max(players[playerSocketId].move.incRot - 0.1,  -0.1)
        //incz =  Math.max(incz - 1,  -1)
        break;
      case 39: // right
        players[playerSocketId].move.incRot =  Math.min(players[playerSocketId].move.incRot+ 0.1,  +0.1)
        // incz =  Math.min(incz + 1,  1)
        break;
      case 38: // up
        players[playerSocketId].move.incx =  Math.max(players[playerSocketId].move.incx - 1,  -1)
        break;
      case 40: // down
        players[playerSocketId].move.incx =  Math.min(players[playerSocketId].move.incx + 1,  1)
        break;
      case 68: // E
        cameraY = 0
        break;
      case 69: // D
        cameraY = 0
        break;
      case 87: // W
        cameraRotateInc = 0
        break;
      case 83: // Left
        cameraRotateInc = 0
        break;
      case 82: // R
          cameraZoom = 0
          break;
        case 70: // F
          cameraZoom = 0
            }
    }, false)
}

      


//Create snowman
mesh = new THREE.Group();
mesh.add(body)
mesh.add(head)
mesh.add(arm1)
mesh.add(arm2)
mesh.add(hat)
mesh.add(hatRim);
mesh.add(nose)
for( var i = 0 ; i < buttons.length;  i++) {
  mesh.add(buttons[i])
}
for( var j = 0; j < eyes.length ; j++) {
  mesh.add(eyes[j])
}

// add the sphere to the scene
scene.add(plane);


        
camera.position.x = 170;
camera.position.y = 60;
camera.position.z = 170;
camera.lookAt(scene.position);


light = new THREE.DirectionalLight(0xdfebff, 1.75);
light.position.set(100, 100, 100);
light.position.set(100, 800, -100);
light.position.multiplyScalar(1.3);
light.castShadow = true;
  

light.shadowCameraFar = 1000;
light.shadowDarkness = 0.2;

scene.add(light);


//removed for now - should come from the server
var cubeSide = 10
var cubeGeometry = new THREE.BoxGeometry(cubeSide,cubeSide,cubeSide);
var cubeMaterial = new THREE.MeshLambertMaterial({
  map: THREE.ImageUtils.loadTexture('../images/m.gif')
});
var cubes = []


var nosCubes = 0
for (var i = 0; i < nosCubes; i++) {
    cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
    randX = Math.random() * 500 - 250;
    randZ = Math.random() * 500 - 250;
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
        bigCube.position.y = 100
        bigCube.position.x = 0
        bigCube.position.z = -300
        bigCube.rotation.y = Math.PI/2

        scene.add( bigCube )

        mesh.castShadow = true;

        // mesh.position.z = 60
        


// large background enemy
// var enemy = mesh.clone()
// enemy.scale.x = 5
// enemy.scale.y = 5
// enemy.scale.z = 5
// enemy.position.x = -100
// enemy.position.z = -50
// enemy.rotation.y = 0.45
// scene.add(enemy)


  
document.getElementById("canvas-view").appendChild(renderer.domElement);

window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth , window.innerHeight );
}
    camY = camera.rotation.y
    camz = camera.rotation.z
    camx = camera.rotation.x
    function render() {
      requestAnimationFrame( render );
      x += 0.02;
      
      var oldx = mesh.position.x
      var oldz = mesh.position.z

      if( players[playerSocketId]) {
        players[playerSocketId].position.x = players[playerSocketId].position.x + players[playerSocketId].move.incx* Math.sin(players[playerSocketId].rotation.y)
        players[playerSocketId].position.z = players[playerSocketId].position.z + players[playerSocketId].move.incx* Math.cos(players[playerSocketId].rotation.y)
        players[playerSocketId].rotation.y = players[playerSocketId].rotation.y + players[playerSocketId].move.incRot
      }

          for (var i=0; i < snowballs.length; i++) {
              if (snowballs[i].position.z > 250 || snowballs[i].position.z < -250  ||
                snowballs[i].position.x > 250 || snowballs[i].position.x < -250) {
                scene.remove(snowballs[i])
              } else {
                snowballs[i].position.x = Math.sin(snowballs[i].direction)*snowballSpeed + snowballs[i].position.x
                snowballs[i].position.z = Math.cos(snowballs[i].direction)*snowballSpeed + snowballs[i].position.z
              }
          }

          for (var i in cubes) {
              if (compareRect(mesh.position, cubes[i].position)) {
                  mesh.position.x = oldx;
                  mesh.position.z  = oldz;
              };
      };


        camera.position.y =  camera.position.y + cameraY / 5
        camera.lookAt(scene.position);



        camera.position.x = camera.position.x + Math.sin(camera.rotation.y)*cameraZoom
        camera.position.z = camera.position.z + Math.cos(camera.rotation.y)*cameraZoom

        distanceFromCenter = Math.sqrt((camera.position.x*camera.position.x ) + (camera.position.z*camera.position.z ))
        cameraRotate = cameraRotate + cameraRotateInc
        camera.position.x = Math.sin(cameraRotate/50)*distanceFromCenter
        camera.position.z = Math.cos(cameraRotate/50)*distanceFromCenter

      bigCube.rotation.x = x/2
      light.position.set(100 + 100*Math.sin(x/10), 100 , 100 + 100*Math.cos(x/10));
      renderer.render( scene, camera );
}
render();

eventListeners()


socket.on('connected', function(socketId){
    playerSocketId = socketId
    players[playerSocketId] = mesh.clone()
    players[playerSocketId].move = {
      incx: 0,
      incRot: 0
    }
    scene.add(players[playerSocketId]);    
    console.log(socketId)
});

socket.on('newPlayer', function(socketId){
    playerSocketId = socketId
    players[playerSocketId] = mesh.clone() 
    players[playerSocketId].position.x = 0 
    players[playerSocketId].position.z = 0 
    players[playerSocketId].position.y = 0 
    players[playerSocketId].rotation.y = 0 
    scene.add(players[playerSocketId]);

    console.log('new player', socketId)
});

socket.on('move' , function( move ) {
    console.log('move', move )
})

socket.on('hi' , function( ) {
    console.log( 'hi' )
})



