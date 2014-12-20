var NOS_TREES = 100;
var NOS_FLAKES = 500;
var particle;
var particles = [];
var topscores = [];
var x = 0;
var newPlayer;
var socket = io.connect(window.location.hostname);

//init THREE.js scene
window.scene = new THREE.Scene();

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x042029));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMapEnabled = true;
document.getElementById('canvas-view').appendChild(renderer.domElement);

var arena = new Arena();
// add the sphere to the scene
arena.addTo(scene);

var geometry = new THREE.Geometry();
var snowMaterial = new THREE.PointCloudMaterial( { color: 0xffffff } );


//snowstorm
for ( var i = 0; i < NOS_FLAKES ; i++ ) {
  particle = new THREE.Vector3( (0.5 - Math.random() ) * Arena.PLANE_SIZE ,  Math.random() * 200 ,  (0.5 - Math.random()) * Arena.PLANE_SIZE )
  geometry.vertices.push(particle);
  particles.push(particle)
}

var snowStorm = new THREE.PointCloud(geometry, snowMaterial );
scene.add(snowStorm)

//add trees
for (var i = 0; i < NOS_TREES; i++) {
  var tree = new Tree();
  if( i < NOS_TREES / 2 ) {
    tree.mesh.position.x = Math.random() * ( Arena.PLANE_SIZE * 0.4 ) * ( Math.random() < 0.5 ? -1 : 1 );
    tree.mesh.position.x = Math.random() * ( Arena.PLANE_SIZE * 0.4 ) * (Math.round(Math.random() * 2) - 1 );
    tree.mesh.position.z = ( Arena.PLANE_SIZE / 2 ) - Math.random() * 50;
    if (i < NOS_TREES/4 ) {
      tree.mesh.position.z *= -1;
    }
  } else {
    tree.mesh.position.z = Math.random() * (Arena.PLANE_SIZE * 0.4) * (Math.random() < 0.5 ? -1 : 1 );
    tree.mesh.position.x = ( Arena.PLANE_SIZE / 2 ) - Math.random() * 50;
    if (i < NOS_TREES * 3 / 4  ) {
      tree.mesh.position.x *= -1;
    }
  }
  var treeScale = (Math.random() + 0.5)*1;
  tree.mesh.scale.set( treeScale, treeScale, treeScale);
  scene.add(tree.mesh)
}

function moveParticles () {
  scene.remove(snowStorm)
  geometry = new THREE.Geometry();
  for (var i = 0; i < particles.length; i++ ) {
    if ( particles[i].y < 0 ) {
      particles[i].y = 100;
    }
    particles[i].y -= (0.2 * (1 + Math.sin(i))); 
    geometry.vertices.push(particles[i]);
  }
  snowStorm = new THREE.PointCloud(geometry, snowMaterial);
  scene.add(snowStorm)
}

var light = new THREE.DirectionalLight(0xdfebff, 1);
light.position.set(100, 1000, 100);
light.position.multiplyScalar(1);
light.castShadow = true;
light.shadowCameraFar = 10000;
light.shadowDarkness = 0.2;

scene.add(light);

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

//iniital setup
startGame(); 
var followCam = new FollowCamera(Game.playerToMove); 
Game.update();
followCam.update();
renderer.render( scene, followCam.camera );


//game loop
function render() {
  if ( Game.time > 0 ) {
    requestAnimationFrame( render );
    x += 0.02;
    Game.update();
    powerInidcator();
    followCam.update();
    moveParticles();
    renderer.render( scene, followCam.camera );
  } else {
    Game.message('Game over - you scored ' + Game.totalPoints);
    socket.emit('single-score' , [Game.totalPoints, $('#player-name').val() || 'Anon']);
    Game.time = 30;
    $('.single-player-start').show();
  }
}


function updateTopScores ( scores ) {
  for ( var i = 1; i <= Math.min(5 , scores.length); i++ ) {
    $('.topscores:nth-of-type(' + i +')').text(scores[i-1][0] + ' ' + scores[i-1][1]);
  }
}

socket.on('connected', function ( a, b, c, scores ) {
  topscores = scores.sort(function(a,b) { return b[0]-a[0] });
  updateTopScores( topscores );
});

socket.on('topscores', function ( scores ) {
 topscores = scores.sort(function(a,b) { return b[0]-a[0] });
  updateTopScores( topscores );
});
