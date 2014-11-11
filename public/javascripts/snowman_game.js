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
var oldx = {}
var oldz = {}
var newPlayer
var thisPlayerName

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
var planeMaterial = new THREE.MeshPhongMaterial({color: 0xcccccc });
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


function fireSnowball( playerId ) {
  snowballs.push( new THREE.Mesh(snowballGeometry,snowballMaterial));
  snowballs[snowballs.length -1].direction =  players[playerId].rotation.y
  snowballs[snowballs.length -1].position.x = players[playerId].position.x + Math.sin(snowballs[snowballs.length -1].direction)*bodyRadius;
  snowballs[snowballs.length -1].position.y = bodyRadius
  snowballs[snowballs.length -1].position.z = players[playerId].position.z + Math.cos(snowballs[snowballs.length -1].direction)*bodyRadius;
  snowballs[snowballs.length -1].id = playerId
  snowballs[snowballs.length -1].nos = playerId
  scene.add(snowballs[snowballs.length - 1])
}

  function compareRect(R1, R2) {
   return !(R1.x+ bodyRadius*2  <= R2.x + cubeSide/ 2 ||
           R1.z - bodyRadius*2  >= R2.z - cubeSide/2 ||
           R1.x >= R2.x + cubeSide ||
           R1.z + bodyRadius*2  <= R2.z + cubeSide/2);
  }

  function sendUpdate() {
    socket.emit('update', {
      position: players[playerSocketId].position,
      rotation: {
        y: players[playerSocketId].rotation.y
      },
      move: players[playerSocketId].move
    })
  }


window.addEventListener('keydown', function(event) {
      switch (event.keyCode) {
        case 13: // W
        joinGameClicked( )
        break
      }
    })

  function eventListeners () {
    window.addEventListener('keydown', function(event) {
      // console.log('called')
      // console.log(players[playerSocketId])
      sendUpdate()
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
          fireSnowball( playerSocketId )
          socket.emit('fireSnowball')
          break;
        }
        sendUpdate()
      }, false)

   window.addEventListener('keyup', function(event) {
    sendUpdate()
    switch (event.keyCode) {
      case 37: // left
        players[playerSocketId].move.incRot =  0 //Math.max(players[playerSocketId].move.incRot - 0.1,  -0.1)
        //incz =  Math.max(incz - 1,  -1)
        break;
      case 39: // right
        players[playerSocketId].move.incRot =  0 //Math.min(players[playerSocketId].move.incRot+ 0.1,  +0.1)
        // incz =  Math.min(incz + 1,  1)
        break;
      case 38: // up
        players[playerSocketId].move.incx =  0 //Math.max(players[playerSocketId].move.incx - 1,  -1)
        break;
      case 40: // down
        players[playerSocketId].move.incx =  0 //Math.min(players[playerSocketId].move.incx + 1,  1)
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
        sendUpdate()
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


var canvas1 = document.createElement('canvas');
var context1 = canvas1.getContext('2d');
  context1.font = "Bold 10px Arial";
  context1.fillStyle = "rgba(200,200,200,0.95)";
  context1.fillText('Hello, world!', 0, 20);
  
  // canvas contents will be used for a texture
  var texture1 = new THREE.Texture(canvas1) 
  texture1.needsUpdate = true;
      
  var material1 = new THREE.MeshBasicMaterial( {map: texture1, side:THREE.DoubleSide } );
  material1.transparent = true;

var mesh1 = new THREE.Mesh(
  new THREE.PlaneGeometry(canvas1.width, canvas1.height),
       material1
  );
  mesh1.position.set(0,0,0);
  // scene.add( mesh1 );

// mesh.add(mesh1)
camera.position.x = 170;
camera.position.y = 60;
camera.position.z = 170;
camera.lookAt(scene.position);


light = new THREE.DirectionalLight(0xdfebff, 1.75);
light.position.set(100, 100, 100);
// light.position.set(100, 800, -100);
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


var nosCubes = 2
var cubePositions = [[20,30], [50,55], [0,100],[120,10], [-120,10], [-100,-40], [-140,70], [-60,130]]
 // var cubePositions = []
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
        bigCube.position.y = 100
        bigCube.position.x = 0
        bigCube.position.z = -300
        bigCube.rotation.y = Math.PI/2

        scene.add( bigCube )

        mesh.castShadow = true;

        // mesh.position.z = 60


var highlightRadius   = bodyRadius,
    highlightMaterial = new THREE.MeshLambertMaterial( { color: 0x0000ff } ),
    highlightGeometry = new THREE.CylinderGeometry(bodyRadius, bodyRadius, 1, 30);
var highlight  = new THREE.Mesh( highlightGeometry, highlightMaterial )
    highlight.rotation.x = Math.PI







$('#join-game').on('click', function() {
  joinGameClicked( )  
})

function joinGameClicked( )  {
  console.log('clicked')
  var playerName = $('#player-name').val()
  $('#player-name').val('')
  if(playerName != '') {
    eventListeners()
    $('.controls').addClass('hide-controls')
    addToPlayersList(playerSocketId , playerName)
    joinGame(playerName)
  }
}


function addToPlayersList(socketId, playerName) {
  if($('#' + socketId).length == 0) {
    $('#players').append('<tr id=' + socketId + '><td>' + playerName + '</td>|<td class="win">0</td>|<td class="loss">0</td></tr>')
  }
}

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
  Object.keys(players).forEach( function( playerId) {
    // mesh1.position.x = 
    oldx[playerId] = players[playerId].position.x
    oldz[playerId] = players[playerId].position.z
    players[playerId].position.x = players[playerId].position.x + players[playerId].move.incx* Math.sin(players[playerId].rotation.y)
    players[playerId].position.z = players[playerId].position.z + players[playerId].move.incx* Math.cos(players[playerId].rotation.y)
    players[playerId].rotation.y = players[playerId].rotation.y + players[playerId].move.incRot
    for (var i = 0; i < cubes.length; i++) {
      if (compareRect(players[playerId].position, cubes[i].position)) {
        players[playerId].position.x = oldx[playerId];
        players[playerId].position.z =  oldz[playerId];
      };
    }
  })

  for (var i=0; i < snowballs.length; i++) {
    if (snowballs[i].position.z > 250 || snowballs[i].position.z < -250  ||
      snowballs[i].position.x > 250 || snowballs[i].position.x < -250) {
      scene.remove(snowballs[i])
    } else {
      snowballs[i].position.x = Math.sin(snowballs[i].direction)*snowballSpeed + snowballs[i].position.x
      snowballs[i].position.z = Math.cos(snowballs[i].direction)*snowballSpeed + snowballs[i].position.z
    }
  }

  camera.position.y =  camera.position.y + cameraY / 5
  camera.lookAt(scene.position);
  camera.position.x = camera.position.x + Math.sin(camera.rotation.y)*cameraZoom
  camera.position.z = camera.position.z + Math.cos(camera.rotation.y)*cameraZoom
  distanceFromCenter = Math.sqrt((camera.position.x*camera.position.x ) + (camera.position.z*camera.position.z ))
  cameraRotate = cameraRotate + cameraRotateInc
  camera.position.x = Math.sin(cameraRotate/50)*distanceFromCenter
  camera.position.z = Math.cos(cameraRotate/50)*distanceFromCenter

  bigCube.rotation.x = x/2
  // light.position.set(100 + 100*Math.sin(x/10), 100 , 100 + 100*Math.cos(x/10));
  renderer.render( scene, camera );
}
render();


function sendUpdate() {
  if( players[playerSocketId]) {
      socket.emit('update', {
        position: players[playerSocketId].position,
        rotation: {
          y: players[playerSocketId].rotation.y
        },
        move: players[playerSocketId].move,
        playerName: players[playerSocketId].playerName
      })
    }
}




function updatePlayers (socketId, player) {

    if( !players[socketId]) {

      newPlayer = mesh.clone();
      newPlayer.position.x = player.position.x
      newPlayer.position.y =  player.position.y
      newPlayer.position.z =  player.position.z
      newPlayer.move= player.move
      newPlayer.playerName = player.playerName
      addToPlayersList(socketId, player.playerName)
      scene.add(newPlayer)

      players[socketId] = newPlayer
    }  else {
      players[socketId].position.x = player.position.x
      players[socketId].position.z = player.position.z
      players[socketId].rotation.y = player.rotation.y
      if(socketId != playerSocketId) {
        players[socketId].move = player.move
      }
    }
}


var playerToCreate

function joinGame( playerName ) {
    thisPlayerName = playerName
    players[playerSocketId] = mesh.clone()
    players[playerSocketId].add(highlight)
    players[playerSocketId].move = {
      incx: 0,
      incRot: 0
    }
    players[playerSocketId].playerName = playerName
    scene.add(players[playerSocketId]);
    sendUpdate()
}


socket.on('connected', function(socketId, currentPlayers, score){
    console.log('This socket id:', socketId)
    console.log('currentPlayers', currentPlayers)
    playerSocketId = socketId

    Object.keys(currentPlayers).forEach( function( playerId) {
      console.log(currentPlayers[playerId].position)
      playerToCreate = {
          position: currentPlayers[playerId].position,
          rotation: {
            y: currentPlayers[playerId].rotation.y
          },
          move: currentPlayers[playerId].move,
          playerName: currentPlayers[playerId].playerName
          // score: currentPlayers[playerId].score
        }
      updatePlayers(playerId, playerToCreate)
      updateScoreboard( score )
    });


});

function updateScoreboard ( score ) {
  console.log( score )
  Object.keys(score).forEach( function ( playerId ) {
    $('#'+playerId +' .win').text(score[playerId].w)
    $('#'+playerId +' .loss').text(score[playerId].l)
  })
}

function regenerate () {
  $('.controls').addClass('ingame')
  $('.controls').removeClass('hide-controls')
  $('#player-name').val(thisPlayerName)
}


socket.on('fireSnowball' , function( socketId ) {
  fireSnowball( socketId )
})

socket.on('score' , function ( score ) {
  updateScoreboard( score )
})

socket.on('update' , function( socketId, player ) {
  updatePlayers(socketId, player)
})

socket.on('user disconnected' , function( playerId ) {
    $('#' + playerId).remove()
    scene.remove(players[playerId])
    delete players[playerId]
})

socket.on('player shot',  function( killerId, deadId) {
  // $('#message').text(players[killerId].playerName + ' hit ' + players[deadId].playerName + ' with a snowball!')
  scene.remove(players[deadId])
  if( deadId == playerSocketId) {
    regenerate()
  }
  delete players[deadId]
  console.log('killed', killerId, deadId)
})



