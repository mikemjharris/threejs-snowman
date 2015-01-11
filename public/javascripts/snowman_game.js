var topscores = [];
var socket = io.connect(window.location.hostname);

//init THREE.js scene
window.scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x042029));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.getElementById('canvas-view').appendChild(renderer.domElement);

var arena = new Arena();
arena.addTo(scene);

var snowStorm = new SnowStorm();
scene.add(snowStorm.mesh);

var forest = new Forest();
scene.add(forest.mesh);

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(100, 1000, 100);
light.position.multiplyScalar(1);
light.castShadow = true;
light.shadowCameraFar = 10000;
light.shadowDarkness = 0.2;

scene.add(light);

//event listeners
window.addEventListener( 'resize', function () {
  followCam.camera.aspect = window.innerWidth / window.innerHeight;
  followCam.camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}, false );

window.addEventListener('keydown', function( event ) {
  switch (event.keyCode) {
    case 13: // Enter
      startSinglePlayerGame()
    break;
  }
});

$('#single-player-start').on('click', function () {
  startSinglePlayerGame();
});

function startSinglePlayerGame() {
  Game.reset();
  Game.message("Go! Throw a snowball! Hit a snowman!");
  $('.single-player-start').hide();
  render();
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
 
//initial setup
  startGame(); 
  var followCam = new FollowCamera(Game.playerToMove); 
  Game.update();
  followCam.update();
  renderer.render( scene, followCam.camera );

//game loop
function render() {
  if ( Game.time > 0 ) {
    requestAnimationFrame( render ); 
    Game.update();
    snowStorm.update();
    powerInidcator();
    followCam.update();
    renderer.render(scene, followCam.camera);
  } else {
    Game.message('Game over - you scored ' + Game.totalPoints);
    socket.emit('single-score' , [Game.totalPoints, $('#player-name').val() || 'Anon']);
    Game.time = 30;
    $('.single-player-start').show();
  }
}

function updateTopScores ( scores ) {
  scores.sort(function(a,b) { return b[0]-a[0] }); 
  for ( var i = 1; i <= Math.min(5 , scores.length); i++ ) {
    $('.topscores:nth-of-type(' + i +')').text(scores[i-1][0] + ' ' + scores[i-1][1]);
  }
}

socket.on('connected', function ( scores ) {
  updateTopScores( scores );
});

socket.on('topscores', function ( scores ) {
  updateTopScores( scores );
});
