(function (window, THREE) {
  var NOS_FLAKES = 1000

  var snowGeometry = new THREE.Geometry();
  var snowMaterial = new THREE.PointCloudMaterial( { color: 0xffffff } );
  var particles = []
  var particle

  //snowstorm
    for ( var i = 0; i < NOS_FLAKES ; i++ ) {
      particle = new THREE.Vector3( (0.5 - Math.random() ) * window.Arena.PLANE_SIZE ,  Math.random() * 200 ,  (0.5 - Math.random()) * Arena.PLANE_SIZE )
      snowGeometry.vertices.push(particle);
      particles.push(particle)
    }
  
  function SnowStorm () {
    this.mesh = new THREE.PointCloud(snowGeometry, snowMaterial );
  }

  SnowStorm.prototype.update = function () {
    window.scene.remove(this.mesh)
    snowGeometry = new THREE.Geometry();
    for (var i = 0; i < particles.length; i++ ) {
      if ( particles[i].y < 0 ) {
        particles[i].y = 100;
      }
      particles[i].y -= (0.2 * (1 + Math.sin(i))); 
      snowGeometry.vertices.push(particles[i]);
    }
    this.mesh = new THREE.PointCloud(snowGeometry, snowMaterial);
    window.scene.add(this.mesh)
}

  window.SnowStorm = SnowStorm;

})(window, window.THREE);