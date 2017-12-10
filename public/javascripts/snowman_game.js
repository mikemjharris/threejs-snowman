var topscores = [];
var socket = io.connect(window.location.hostname);

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

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
       if( Game.time >= GAME_TIME - 1 ) {
        if( $('#player-name').val() === "" ) {
            $('#player-name').addClass('alert');
          } else {
            $('#player-name').removeClass('alert');
            $('.single-player-start').addClass('played');
            startSinglePlayerGame();
          }
        }
    break;
  }
});

$('.single-player-start-button').on('click', function () {
  if( $('#player-name').val() === "" ) {
    $('#player-name').addClass('alert');
  } else {
    $('#player-name').removeClass('alert');
    $('.single-player-start').addClass('played');
    startSinglePlayerGame();
  }
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
    Game.message('Game over - you scored ' + addCommas(Game.totalPoints));
    $('.after a').replaceWith('<a href="https://twitter.com/intent/tweet?&text=Do you wanna throw a snowball? I scored ' + Game.totalPoints + ' in a snowball fight. See if you can beat me. http://snowman.mikemjharris.com &"  target="_blank">Share score on twitter</a>')
    $('.message-main').text('You scored: ' + addCommas(Game.totalPoints));
    socket.emit('single-score' , [Game.totalPoints, $('#player-name').val() || 'Anon']);
    $('#time').text('Time up!');
    Game.time = 30;
    $('.single-player-start').show();
  }
}

function updateTopScores ( scores ) {
  $('.topscores').html("")
  scores.sort( function ( a,b ) {
    return b[0] - a[0];
  });
  for ( var i = 0; i < Math.min(5 , scores.length); i++ ) {
    $('.topscores').append('<span>' + scores[i][1] + ' ' + addCommas(scores[i][0]) + '</span>');
  }
}

socket.on('connected', function ( scores ) {
  updateTopScores( scores );
});

socket.on('topscores', function ( scores ) {
  updateTopScores( scores );
});
