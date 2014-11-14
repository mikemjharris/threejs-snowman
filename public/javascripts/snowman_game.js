//structures.js
//controls.js
//player.js
//snowman.js

var snowBallPowerUp = false;


var incx = 0;
var incz = 0;
var incRot = 0;
var snowmanSpeed = 2;
var cameraY = 0;
var cameraRotate = 0;
var cameraRotateInc = 0
var cameraZoom = 0
var x = 0;
var light;
var playerSocketId;
var oldx = {};
var oldz = {};
var newPlayer;
var thisPlayerName;
var toLookat = {
  x: 0,
  y: 0,
  z: 0
};
var firstTimeConnect = true;
var planeSize = 1000;

var socket = io.connect(window.location.hostname);

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
  });
}



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



var tree



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
var cameraType = 'move'
camera.position.x = camera.position.x + Math.sin(camera.rotation.y)*cameraZoom
camera.position.z = camera.position.z + Math.cos(camera.rotation.y)*cameraZoom
distanceFromCenter = Math.sqrt((camera.position.x*camera.position.x ) + (camera.position.z*camera.position.z ))
cameraRotate = cameraRotate + cameraRotateInc
camera.position.x = Math.sin(cameraRotate/50)*distanceFromCenter
camera.position.z = Math.cos(cameraRotate/50)*distanceFromCenter
camera.lookAt(scene.position);
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

var ooPlayer









Game.createPlayer('t')
eventListeners()



var snowBallPower = 0

function render() {
  requestAnimationFrame( render );
   x += 0.02;
   Game.update()
    camera.position.y =  camera.position.y + cameraY / 5


    if( snowBallPowerUp) {

      snowballPower += 0.1;
    }

  if( cameraType == 'static') {
    camera.position.x = 170;
    camera.position.y = 60;
    camera.position.z = 170;


    camera.position.x = camera.position.x + Math.sin(camera.rotation.y)*cameraZoom
    camera.position.z = camera.position.z + Math.cos(camera.rotation.y)*cameraZoom
    distanceFromCenter = Math.sqrt((camera.position.x*camera.position.x ) + (camera.position.z*camera.position.z ))
    cameraRotate = cameraRotate + cameraRotateInc
    camera.position.x = Math.sin(cameraRotate/50)*distanceFromCenter
    camera.position.z = Math.cos(cameraRotate/50)*distanceFromCenter

    camera.lookAt(scene.position);

  } else if (cameraType == 'move') {
    if( players[playerSocketId] ) {


      camera.position.x = players[playerSocketId].position.x - 40 * Math.sin(players[playerSocketId].rotation.y)
      camera.position.z = players[playerSocketId].position.z - 40 * Math.cos(players[playerSocketId].rotation.y)
      camera.position.y = 60

      toLookat = players[playerSocketId].position.clone()
      toLookat.x = toLookat.x + 100 * Math.sin(players[playerSocketId].rotation.y)
      toLookat.z = toLookat.z + 100 * Math.cos(players[playerSocketId].rotation.y)
      camera.lookAt(toLookat)
    } else {
      camera.lookAt(scene.position);
    }
  }


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


// players[playerSocketId].move.incRot =  Math.min(players[playerSocketId].move.incRot + 0.1,  0.1)

socket.on('connected', function(socketId, currentPlayers, score){
    firstTimeConnect = false;
    playerSocketId = socketId

    Object.keys(currentPlayers).forEach( function( playerId) {
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

function regenerate ( whyRegenerate) {

  if(thisPlayerName) {
    $('.controls').addClass('ingame')
    $('.controls').removeClass('hide-controls')
    $('#player-name').val(thisPlayerName)

  } else {
    $('.controls').removeClass('hide-controls')
  }

  if( whyRegenerate === 'disconnect') {
    $('.regenerate h2').text('Reconnected to the server - click the button to rejoin the game')
  } else {
    $('.regenerate h2').text("You got shot! Click the button to rejoin")
  }

  $('.controls').removeClass('hide-controls')
}

var haveDisconnected = false

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

socket.on('connect' , function(){
  $('#message').text('Connected')
  regenerate('disconnect')

})
socket.on('disconnect' , function(){
  $('#message').text('Disconnected from the server')
  Object.keys(players).forEach(function ( playerId) {
    $('#' + playerId).remove()
    scene.remove(players[playerId])
    delete players[playerId]
  })


})

socket.on('player shot',  function( killerId, deadId) {
  $('#message').text(players[killerId].playerName + ' hit ' + players[deadId].playerName + ' with a snowball!')
  scene.remove(players[deadId])
  if( deadId == playerSocketId) {
    regenerate()
  }
  delete players[deadId]
  console.log('killed', killerId, deadId)
})



