

window.addEventListener('keydown', function(event) {
  switch (event.keyCode) {
    case 13: // Enter
    joinGameClicked();
    break;
  }
});

function eventListeners () {
window.addEventListener('keydown', function(event) {
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
      Game.playerToMove.rotateDirection( 0.1 );
      console.log('here')
      break;
    case 39: // right
      Game.playerToMove.rotateDirection( -0.1 );
      break;
    case 38: // up
      Game.playerToMove.moveDirection( 1 );
      break;
    case 40: // down
      Game.playerToMove.moveDirection( -1 );
      break;
    case 32: // spacebar
      Game.playerToMove.fireSnowball();
      // socket.emit('fireSnowball')
      break;
    case 77: //m
      if ( cameraType === 'static' ) {
        cameraType = 'move';
      } else {

        cameraType = 'static';
      }
      break;
    }
    sendUpdate()
  }, false)

window.addEventListener('keyup', function(event) {
  sendUpdate()
  switch (event.keyCode) {
    case 37: // left
      Game.playerToMove.rotateDirection(0);
      //incz =  Math.max(incz - 1,  -1)
      break;
    case 39: // right
      Game.playerToMove.rotateDirection(0);
      // incz =  Math.min(incz + 1,  1)
      break;
    case 38: // up
      Game.playerToMove.moveDirection(0);
      break;
    case 40: // down
      Game.playerToMove.moveDirection(0);
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

