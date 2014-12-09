function updateCamera() {
  if( cameraType === 'static' ) {
    camera.position.x = 170;
    camera.position.y = 60;
    camera.position.z = 170;
    camera.position.x = camera.position.x + Math.sin(camera.rotation.y) * cameraZoom;
    camera.position.z = camera.position.z + Math.cos(camera.rotation.y) * cameraZoom;
    distanceFromCenter = Math.sqrt((camera.position.x * camera.position.x ) + (camera.position.z * camera.position.z));
    cameraRotate = cameraRotate + cameraRotateInc;
    camera.position.x = Math.sin(cameraRotate / 50) * distanceFromCenter;
    camera.position.z = Math.cos(cameraRotate / 50) * distanceFromCenter;
    camera.lookAt(scene.position);
  } else if (cameraType === 'move') {
    if( Game.playerToMove.mesh ) {
      camera.position.x = Game.playerToMove.mesh.position.x - 40 * Math.sin(Game.playerToMove.mesh.rotation.y);
      camera.position.z = Game.playerToMove.mesh.position.z - 40 * Math.cos(Game.playerToMove.mesh.rotation.y);
      camera.position.y = 60;
      toLookat = Game.playerToMove.mesh.position.clone();
      toLookat.x = toLookat.x + 100 * Math.sin(Game.playerToMove.mesh.rotation.y);
      toLookat.z = toLookat.z + 100 * Math.cos(Game.playerToMove.mesh.rotation.y);
      camera.lookAt(toLookat);
    } else {
      camera.lookAt(scene.position);
    }
  }
}
