//init THREE.js scene
var scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x042029));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;

var arena = new Arena();
// add the sphere to the scene
scene.add(arena.mesh);

// var cubes = [];
// for (var i = 0; i < 30; i++) {
//   var cube = new MammalCube();
//   cube.mesh.position.x = Math.random() * (Arena.PLANE_SIZE * 0.4) * (Math.round(Math.random() * 2) - 1);
//   cube.mesh.position.y = Math.random() * MammalCube.CUBE_SIDE / 2 ;
//   cube.mesh.position.z = Math.random() * (Arena.PLANE_SIZE * 0.4) * (Math.round(Math.random() * 2) - 1);
//   cubes.push(cube);
//   scene.add(cube.mesh);
// }
// for (var i = 0; i < 10; i++) {
//   var tree = new Tree();
//   tree.mesh.position.x = Math.random() * (Arena.PLANE_SIZE * 0.4) * (Math.round(Math.random() * 2) - 1);
//   tree.mesh.position.z = Math.random() * (Arena.PLANE_SIZE * 0.4) * (Math.round(Math.random() * 2) - 1);

//   scene.add(tree.mesh);

// }
var topscores = [];
var x = 0;
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
var socket = io.connect(window.location.hostname);

function sendUpdate() {
  socket.emit('update', {
    position: players[playerSocketId].position,
    rotation: {
      y: players[playerSocketId].rotation.y
    },
    move: players[playerSocketId].move
  });
}

// window.addEventListener('keydown', function( event ) {
//   switch (event.keyCode) {
//     case 13: // Enter
//       joinGameClicked();
//     break;
//   }
// });

document.getElementById('canvas-view').appendChild(renderer.domElement);

window.addEventListener( 'resize', function () {
  followCam.camera.aspect = window.innerWidth / window.innerHeight;
  followCam.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false );

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(100, 1000, 100);
light.position.multiplyScalar(1);
light.castShadow = true;
light.shadowCameraFar = 10000;
light.shadowDarkness = 0.2;

scene.add(light);

$('#join-game').on('click', function () {
  joinGameClicked();
});

$('#single-player-start').on('click', function () {
  Game.reset();

  Game.message("Go! Throw a snowball! Hit a snowman!");
  $('.single-player-start').hide();
  render();
})

function joinGameClicked() {
  var playerName = $('#player-name').val();
  $('#player-name').val('');
  if ( playerName !== '' ) {
    $('.controls').addClass('hide-controls');
    addToPlayersList(playerSocketId, playerName);
    joinGame(playerName);
  }
}

function addToPlayersList( socketId, playerName ) {
  if ( $('#' + socketId).length === 0 ) {
    $('#players').append('<tr id=' + socketId + '><td>' + playerName + '</td>|<td class="win">0</td>|<td class="loss">0</td></tr>');
  }
}

function powerInidcator() {
  $('#last-power').css('width', window.innerWidth / 12 * Game.lastPower + 'px');
  $('#power').css('width', window.innerWidth / 12 * Game.playerToMove.snowballPower + 'px');
}

function startGame() {
  Game.createPlayer('t', {
    keysEnabled: true,
    move: {
      incx: 0,
      incRot: 0
    }
  });
  Game.createTarget();
}
startGame();

var followCam = new FollowCamera(Game.playerToMove);

//game loop
function render() {
  if ( Game.time > 0 ) {
    requestAnimationFrame( render );
    x += 0.02;
    Game.update();
    powerInidcator();
    followCam.update();
    renderer.render( scene, followCam.camera );
  } else {
    Game.message('Game over - you scored ' + Game.totalPoints);
    socket.emit('single-score' , Game.totalPoints);
    Game.time = 30;
    $('.single-player-start').show();
  }
}

Game.update();
followCam.update();
renderer.render( scene, followCam.camera );

function sendUpdate() {
  if ( players[playerSocketId] ) {
    socket.emit('update', {
      position: players[playerSocketId].position,
      rotation: {
        y: players[playerSocketId].rotation.y
      },
      move: players[playerSocketId].move,
      playerName: players[playerSocketId].playerName
    });
  }
}

function updatePlayers ( socketId, player ) {
  if ( !players[socketId] ) {
    newPlayer = snowmanMesh.clone();
    newPlayer.position.x = player.position.x;
    newPlayer.position.y =  player.position.y;
    newPlayer.position.z =  player.position.z;
    newPlayer.move = player.move;
    newPlayer.playerName = player.playerName;
    addToPlayersList(socketId, player.playerName);
    scene.add(newPlayer);
    players[socketId] = newPlayer;
  } else {
    players[socketId].position.x = player.position.x;
    players[socketId].position.z = player.position.z;
    players[socketId].rotation.y = player.rotation.y;
    if ( socketId !== playerSocketId ) {
      players[socketId].move = player.move;
    }
  }
}

var playerToCreate;

function joinGame( playerName ) {
  thisPlayerName = playerName;
  players[playerSocketId] = snowmanMesh.clone();
  players[playerSocketId].add(highlight);
  players[playerSocketId].move = {
    incx: 0,
    incRot: 0
  };
  players[playerSocketId].playerName = playerName;
  scene.add(players[playerSocketId]);
  sendUpdate();
}

// players[playerSocketId].move.incRot =  Math.min(players[playerSocketId].move.incRot + 0.1,  0.1)

// socket.on('connected', function ( socketId, currentPlayers, score ) {
//   firstTimeConnect = false;
//   playerSocketId = socketId;

//   Object.keys(currentPlayers).forEach( function ( playerId ) {
//     playerToCreate = {
//       position: currentPlayers[playerId].position,
//       rotation: {
//         y: currentPlayers[playerId].rotation.y
//       },
//       move: currentPlayers[playerId].move,
//       playerName: currentPlayers[playerId].playerName
//       // score: currentPlayers[playerId].score
//     };
//     updatePlayers(playerId, playerToCreate);
//     updateScoreboard(score);
//   });

// });

function updateScoreboard( score ) {
  console.log( score );
  Object.keys(score).forEach( function ( playerId ) {
    $('#' + playerId + ' .win').text(score[playerId].w);
    $('#' + playerId + ' .loss').text(score[playerId].l);
  });
}

function regenerate( whyRegenerate ) {
  if ( thisPlayerName ) {
    $('.controls').addClass('ingame');
    $('.controls').removeClass('hide-controls');
    $('#player-name').val(thisPlayerName);
  } else {
    $('.controls').removeClass('hide-controls');
  }
  if ( whyRegenerate === 'disconnect' ) {
    $('.regenerate h2').text('Reconnected to the server - click the button to rejoin the game');
  } else {
    $('.regenerate h2').text('You got shot! Click the button to rejoin');
  }
  $('.controls').removeClass('hide-controls');
}

var haveDisconnected = false;

// socket.on('fireSnowball', function ( socketId ) {
//   fireSnowball( socketId );
// });

// socket.on('score', function ( score ) {
//   updateScoreboard( score );
// });

// socket.on('update', function ( socketId, player ) {
//   updatePlayers(socketId, player);
// });

// socket.on('user disconnected', function ( playerId ) {
//   $('#' + playerId).remove();
//   scene.remove(players[playerId]);
//   delete players[playerId];
// });


function updateTopScores ( scores ) {
  for ( var i = 1; i <= 5; i++ ) {
    $('.topscores:nth-of-type(' + i +')').text(scores[i-1]);
  }
}

socket.on('connected', function ( a, b, c, scores ) {
  topscores = scores.sort(function(a,b) { return b-a });
  updateTopScores( topscores );
  $('#message').text('Connected');
  // regenerate('disconnect');
});

socket.on('topscores', function ( scores) {
  topscores = scores.sort(function(a,b) { return b-a });
  $('#message').text('Gotscores');
  updateTopScores( topscores );
  // regenerate('disconnect');
});

// socket.on('disconnect', function () {
//   $('#message').text('Disconnected from the server');
//   Object.keys(players).forEach(function ( playerId) {
//     $('#' + playerId).remove();
//     scene.remove(players[playerId]);
//     delete players[playerId];
//   });
// });

// socket.on('player shot', function ( killerId, deadId ) {
//   $('#message').text(players[killerId].playerName + ' hit ' + players[deadId].playerName + ' with a snowball!');
//   scene.remove(players[deadId]);
//   if ( deadId === playerSocketId ) {
//     regenerate();
//   }
//   delete players[deadId];
//   console.log('killed', killerId, deadId);
// });
