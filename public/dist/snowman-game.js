(function (window, THREE) {

  function Snowman () {
    this.mesh = _snowmanMesh.clone();
    this.position = {};
  }

  Snowman.HAT_HEIGHT = 6;
  Snowman.HAT_RIM_HEIGHT = 1;
  Snowman.BODY_RADIUS = 9;
  Snowman.HEAD_RADIUS = 4;
  Snowman.BUTTON_COUNT = 3;
  Snowman.BUTTON_RADIUS = 1;
  Snowman.EYE_RADIUS = 0.5;
  Snowman.HOUSE_HEIGHT = 3;

  var buttons = [];
  var eyes = [];

  Snowman.prototype.update = function() {
    this.mesh.position = this.position;
  };

  //

  var bodyGeometry = new THREE.SphereGeometry(Snowman.BODY_RADIUS, 30, 30);
  var headGeometry = new THREE.SphereGeometry(Snowman.HEAD_RADIUS, 30, 30);
  var hatGeometry = new THREE.CylinderGeometry(3, 3, Snowman.HAT_HEIGHT, 40);
  var hatRimGeometry = new THREE.CylinderGeometry(4, 4, Snowman.HAT_RIM_HEIGHT, 40);
  var eyeGeometry = new THREE.SphereGeometry(Snowman.EYE_RADIUS, 30, 30);
  var buttonGeometry = new THREE.SphereGeometry(Snowman.BUTTON_RADIUS, 30, 30);

  var bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });

  var headMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    wireframe: false
  });

  var hatMaterial = new THREE.MeshLambertMaterial({
    color: 0x333333,
    wireframe: false
  });

  var eyeMaterial = new THREE.MeshLambertMaterial({
    color: 0x666666,
    wireframe: false
  });

  var buttonMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false
  });

  var armMaterial = new THREE.LineBasicMaterial({
    color: 0xA52A2A
  });

  var body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  var head = new THREE.Mesh(headGeometry, headMaterial);
  var hat = new THREE.Mesh(hatGeometry, hatMaterial);
  var hatRim = new THREE.Mesh(hatRimGeometry, hatMaterial);

  var i;
  for ( i = 0; i < Snowman.BUTTON_COUNT; i++ ) {
    buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);
    var buttonAngle = (i + 3) * Math.PI / 6;
    buttons[i].position.x = 0;
    buttons[i].position.y =  Snowman.BODY_RADIUS * (1 - Math.cos(buttonAngle));
    buttons[i].position.z = Snowman.BODY_RADIUS * Math.sin(buttonAngle) + Snowman.BUTTON_RADIUS * 0.8;
    buttons[i].castShadow = true;
  }

  var eyeAngelZ;
  var eyeAngelXY;
  for ( i = 0; i < 2; i++ ) {
    eyes[i] = new THREE.Mesh(eyeGeometry, eyeMaterial);
    eyeAngelZ = Math.PI * 3 / 8;
    eyeAngelXY = Math.PI * 5 / 8;
    //todo - the maths here isn't right.
    eyes[i].position.x =  (-1 + 2 * i) * Snowman.HEAD_RADIUS * Math.cos((-1 + 2 * i) * eyeAngelZ) + Snowman.EYE_RADIUS * (-1 + 2 * i) / 5;
    eyes[i].position.z = Snowman.HEAD_RADIUS + Snowman.EYE_RADIUS + Math.cos(eyeAngelXY) * Math.sin(eyeAngelZ) * Snowman.HEAD_RADIUS;
    eyes[i].position.y = Snowman.BODY_RADIUS * 2 + Snowman.HEAD_RADIUS + Math.sin(eyeAngelXY) * Math.cos(eyeAngelZ) * Snowman.HEAD_RADIUS;
  }

  var arm1Geometry = new THREE.Geometry();
  arm1Geometry.vertices.push(new THREE.Vector3(0, Snowman.BODY_RADIUS, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(Snowman.BODY_RADIUS * 1.5, Snowman.BODY_RADIUS * 1.5, 0));
  arm1Geometry.vertices.push(new THREE.Vector3(Snowman.BODY_RADIUS * 1.7, Snowman.BODY_RADIUS * 2, 0));

  var arm2Geometry = new THREE.Geometry();
  arm2Geometry.vertices.push(new THREE.Vector3(0, Snowman.BODY_RADIUS, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-Snowman.BODY_RADIUS * 1.5, Snowman.BODY_RADIUS * 1.5, 0));
  arm2Geometry.vertices.push(new THREE.Vector3(-Snowman.BODY_RADIUS * 1.7, Snowman.BODY_RADIUS * 2, 0));

  var arm1 = new THREE.Line(arm1Geometry, armMaterial);
  var arm2 = new THREE.Line(arm2Geometry, armMaterial);
  var nose = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 0, Snowman.HOUSE_HEIGHT, 40),
      new THREE.MeshLambertMaterial({
        color: 0xFFA500,
        wireframe: false
      })
  );

  nose.rotation.z =  Math.PI / 2;
  nose.rotation.y =  Math.PI * 1.5;
  nose.position.z = Snowman.HEAD_RADIUS + Snowman.HOUSE_HEIGHT / 2;
  nose.position.y = Snowman.BODY_RADIUS * 2 + Snowman.HEAD_RADIUS;

  hat.position.y = Snowman.BODY_RADIUS * 2  +  Snowman.HEAD_RADIUS * 1.75 + Snowman.HAT_HEIGHT / 2;
  hatRim.position.y = Snowman.BODY_RADIUS * 2  +  Snowman.HEAD_RADIUS * 1.75 + Snowman.HAT_RIM_HEIGHT / 2;

  body.castShadow = true;
  body.position.x = 0;
  body.position.y = Snowman.BODY_RADIUS;
  body.position.z = 0;

  head.position.x = 0;
  head.position.y = (parseInt(Snowman.BODY_RADIUS) * 2 + parseInt(Snowman.HEAD_RADIUS));
  head.position.z = 0;

  // Create snowman
  var _snowmanMesh = new THREE.Group();
  _snowmanMesh.add(body);
  _snowmanMesh.add(head);
  _snowmanMesh.add(arm1);
  _snowmanMesh.add(arm2);
  _snowmanMesh.add(hat);
  _snowmanMesh.add(hatRim);
  _snowmanMesh.add(nose);

  for ( i = 0; i < buttons.length; i++ ) {
    _snowmanMesh.add(buttons[i]);
  }

  for ( var j = 0; j < eyes.length; j++ ) {
    _snowmanMesh.add(eyes[j]);
  }

  _snowmanMesh.castShadow = true;

  window.Snowman = Snowman;

})(window, window.THREE);

(function (window, THREE) {

  var TREE_HEIGHT = 60;
  var TRUNK_HEIGHT = 15;

  var treeGeometry = new THREE.CylinderGeometry(0, 20, TREE_HEIGHT, 40);
  var treeMaterial = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    wireframe: false
  });
  var tree = new THREE.Mesh(treeGeometry,treeMaterial);
  var trunkGeometry = new THREE.CylinderGeometry(5, 5, TRUNK_HEIGHT, 40);
  var trunkMaterial = new THREE.MeshLambertMaterial({
    color: 0x000000,
    wireframe: false
  });
  var trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

  tree.position.y = TREE_HEIGHT / 2 + TRUNK_HEIGHT;
  trunk.position.y = TRUNK_HEIGHT / 2;
  tree.castShadow = true;

  var wholeTree = new THREE.Group();
  wholeTree.add(trunk);
  wholeTree.add(tree);
  wholeTree.castShadow = true;

  function Tree () {
    this.mesh = wholeTree.clone();
  }

  window.Tree = Tree;

})(window, window.THREE);

(function (window, THREE) {

  var PLANE_SIZE = 1000;

  //Geometries
  var planeGeometry = new THREE.PlaneGeometry(PLANE_SIZE, PLANE_SIZE, 32, 32);

  for (var i = 0, l = planeGeometry.vertices.length; i < l; i++) {
    planeGeometry.vertices[i].z = Math.random() * 5;
  }

  //Materials
  var planeMaterial = new THREE.MeshPhongMaterial({
    color: 0xEAF4FE
  });

  //Create objects
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -0.5 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0;
  plane.position.z = 0;
  plane.receiveShadow = true;
  plane.castShadow = true;

  function Arena() {
    this.mesh = plane.clone();
  }

  Arena.PLANE_SIZE = PLANE_SIZE;

  window.Arena = Arena;

})(window, window.THREE);

(function (window, THREE) {

  var CUBE_SIDE = 10;
  var cubeGeometry = new THREE.BoxGeometry(CUBE_SIDE, CUBE_SIDE, CUBE_SIDE);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    map: THREE.ImageUtils.loadTexture('../images/m.gif')
  });

  var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
  cube.castShadow = true;

  function MammalCube() {
    this.mesh = cube.clone();
  }

  MammalCube.CUBE_SIDE = CUBE_SIDE;

  window.MammalCube = MammalCube;

})(window, window.THREE);

var movementSpeed = 8;
var totalObjects = 100;
var objectSize = 1;
var sizeRandomness = 4000;
var dirs = [];
var parts = [];

function ExplodeAnimation( x, y, z ) {
  var geometry = new THREE.Geometry();
  for ( var i = 0; i < totalObjects; i++ ) {
    var vertex = new THREE.Vector3();
    vertex.x = x;
    vertex.y = y;
    vertex.z = z;

    geometry.vertices.push( vertex );
    dirs.push({
      x: (Math.random() * movementSpeed) - (movementSpeed / 2),
      y: (Math.random() * movementSpeed) - (movementSpeed / 2),
      z: (Math.random() * movementSpeed) - (movementSpeed / 2)
    });
  }
  var material = new THREE.PointCloudMaterial({
    size: objectSize,
    color: 0xffffff
  });
  var particles = new THREE.PointCloud(geometry, material);

  this.object = particles;
  this.status = true;

  this.xDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
  this.yDir = (Math.random() * movementSpeed) - (movementSpeed / 2);
  this.zDir = (Math.random() * movementSpeed) - (movementSpeed / 2);

  scene.add(this.object);

  this.update = function() {
    if (this.status === true){
      var pCount = totalObjects;
      while ( pCount-- ) {
        var particle =  this.object.geometry.vertices[pCount];
        particle.y += dirs[pCount].y;
        particle.x += dirs[pCount].x;
        particle.z += dirs[pCount].z;
      }
      this.object.geometry.verticesNeedUpdate = true;
    }
  };

}

(function (window, THREE, Snowman) {

  var snowballSize = 2;
  var snowballGeometry = new THREE.SphereGeometry(snowballSize, 30, 30);
  var snowballMaterial = new THREE.MeshLambertMaterial({
    color: 0xffffff, wireframe: false
  });

  var _snowballMesh = new THREE.Mesh(snowballGeometry,snowballMaterial);
  _snowballMesh.castShadow = true;

  function Snowball( playerId, position, direction, power ) {
    this.mesh = _snowballMesh.clone();

    if ( arguments.length > 0 ) {
      this.widthX = snowballSize * 2;
      this.widthZ = snowballSize * 2;
      this.widthY = snowballSize * 2;
      this.direction = direction; //equivalent to rotation.y on a threeJS object;
      this.mesh.position.x = position.x + Math.sin(direction - Math.PI / 2) * (Snowman.BODY_RADIUS + 5);
      this.mesh.position.y = Snowman.BODY_RADIUS + 1;
      this.mesh.position.z = position.z + Math.cos(direction - Math.PI / 2) * (Snowman.BODY_RADIUS + 5);
      this.id = playerId;
      this.speedY = power;

      this.startX = this.mesh.position.x;
      this.startZ = this.mesh.position.z;
      this.snowballSpeed = power;
      this.crossY = false;
      this.crossX = 0;
      this.crossZ = 0;
      this.alive = true;
    }
  }

  Snowball.prototype.update = function () {
    this.mesh.position.x += Math.sin(this.direction) * this.snowballSpeed;
    this.mesh.position.z += Math.cos(this.direction) * this.snowballSpeed;
    this.mesh.position.y += this.speedY;
    this.speedY -= 0.1;

    if ( !this.crossY && this.mesh.position.y <= 0 ) {
      this.crossY = true;
      this.crossX = this.mesh.position.x;
      this.crossZ = this.mesh.position.z;
    }
  };

  Snowball.prototype.kill = function () {
    this.alive = false;
  };

  window.Snowball = Snowball;
})(window, window.THREE, window.Snowman);

(function (window, THREE, Snowman, Snowball) {

  var SNOWBALL_POWER_LIMIT = 10;

  function Player( snowman, id, options ) {
    var self = this;
    this.mesh = snowman.mesh;
    this.id = id;
    this.move = {
      incx: 0,
      incRot: 0
    };
    this.playerName = '';
    this.snowBallPowerUp = false;
    this.snowballPower = 0;

    if ( options ) {
      this.move = options.move;
      this.playerName = options.playerName;

      if ( options.keysEnabled ) {
        window.addEventListener('keydown', function( event ) {
          switch ( event.keyCode ) {
            case 37: // left
              self.rotateDirection( 0.05 );
            break;
            case 39: // right
              self.rotateDirection( -0.05 );
            break;
            case 38: // up
              self.moveDirection( 2 );
            break;
            case 40: // down
              self.moveDirection( -2 );
            break;
            case 32: // spacebar
              self.snowBallPowerUp = true;
            break;
          }
          // sendUpdate();
        });

        window.addEventListener('keyup', function( event ) {
          switch (event.keyCode) {
            case 37: // left
              self.rotateDirection(0);
            break;
            case 39: // right
              self.rotateDirection(0);
            break;
            case 38: // up
              self.moveDirection(0);
            break;
            case 40: // down
              self.moveDirection(0);
            break;
            case 32: // spacebar
              var snowball = self.makeSnowball( self.snowballPower );
              scene.add(snowball.mesh);
              Game.lastPower = self.snowballPower;
              Game.snowballs.push(snowball);
              self.snowBallPowerUp = false;
              self.snowballPower = 0;
            break;
          }
          // sendUpdate();
        }, false);
      }
    }
  }

  Player.prototype.moveDirection = function( incx ) {
    this.move.incx = incx;
  };

  Player.prototype.rotateDirection = function( rot ) {
    this.move.incRot = rot;
  };

  Player.prototype.update = function() {
    this.mesh.position.x += this.move.incx * Math.sin(this.mesh.rotation.y);
    this.mesh.position.z += this.move.incx * Math.cos(this.mesh.rotation.y);
    this.mesh.rotation.y += this.move.incRot;

    if ( this.snowBallPowerUp && this.snowballPower < SNOWBALL_POWER_LIMIT ) {
      this.snowballPower += 0.1;
    }
  };

  Player.prototype.makeSnowball = function( power ) {
    return new Snowball(this.id, this.mesh.position, this.mesh.rotation.y, power);
  };

  window.Player = Player;

})(window, window.THREE, window.Snowman, window.Snowball);

(function (window, THREE) {

  function FollowCamera ( player ) {
    this.player = player;
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  FollowCamera.prototype.update = function() {
    this.camera.position.x = this.player.mesh.position.x - 40 * Math.sin(this.player.mesh.rotation.y);
    this.camera.position.z = this.player.mesh.position.z - 40 * Math.cos(this.player.mesh.rotation.y);
    this.camera.position.y = 60;
    var toLookat = this.player.mesh.position.clone();
    toLookat.x = toLookat.x + 100 * Math.sin(this.player.mesh.rotation.y);
    toLookat.z = toLookat.z + 100 * Math.cos(this.player.mesh.rotation.y);
    this.camera.lookAt(toLookat);
  };

  window.FollowCamera = FollowCamera;

})(window, window.THREE);


var GAME_TIME = 30;

var Game = {
  players: [],
  snowballs: [],
  marks: [],
  explosions: [],
  targets: [],
  totalPoints: 0,
  time: GAME_TIME
};

Game.createPlayer = function ( id, options ) {
  var newPlayer = new Player(new Snowman(), id, options);
  scene.add(newPlayer.mesh);
  this.players.push(newPlayer);
  this.playerToMove = newPlayer;
};

Game.findPlayer = function( id ) {
  return this.players.filter(function(player) {
    return player.id === id;
  })[0];
};

Game.createPlayers = function ( currentPlayers ) {
  currentPlayers.forEach(function ( player ) {
    this.createPlayer(player.id, player);
  });
};

Game.reset = function () {

  [Game.snowballs, Game.targets, Game.marks].forEach(function( collection ) {
    collection.forEach(function ( gameObj ) {
      scene.remove(gameObj.mesh);
    });
  });


  Game.snowballs = [];
  Game.targets = [];
  Game.marks = [];
  Game.explosions = [];
  Game.totalPoints = 0;
  Game.time = GAME_TIME;
  Game.createTarget();
   $('#score').text(Game.totalPoints);

};

Game.update = function () {
  //Move the players
  this.players.forEach(function ( player ) {
    player.update();
  });

  //move snowballs
  this.snowballs.forEach(function ( snowball ) {
    if ( snowball.alive ) {
      snowball.update();
    } else {
      scene.remove(snowball.mesh);
    }
  });

  this.updateTarget();
  this.checkTargetCollision();
  this.checkSnowballsHitFloor();

  //explode explosion
  this.explosions.forEach(function ( explosion ) {
    explosion.update();
  });
  this.time -= 1 / 60;
  $('#time').text(Math.round(this.time));
  $('#counter').text(Math.round(this.targets[0].counter));
  var distanceToTarget = Math.round(
      Math.sqrt(
          Math.pow(
              this.players[0].mesh.position.x - this.targets[0].mesh.position.x,
              2
          ) +
          Math.pow(
              this.players[0].mesh.position.z - this.targets[0].mesh.position.z,
              2
          )
      )
  );
  $('#dist').text(distanceToTarget);
};

Game.checkSnowballsHitFloor = function () {
  this.snowballs.forEach(function ( snowball ) {
    if ( snowball.alive && snowball.crossY ) {
      snowball.kill();
      Game.explosions.push(
          new ExplodeAnimation(snowball.crossX, 0, snowball.crossZ)
      );
      Game.markHit( snowball.crossX, snowball.crossZ );
    }
  });
};

Game.markHit = function ( x, z ) {
  var snowball = new Snowball().mesh;
  snowball.position.x = x;
  snowball.position.z = z;
  snowball.position.y = -1 + 2 * Math.random();
  this.marks.push(snowball);
  scene.add(snowball);
};

Game.createTarget = function ( ) {
  var snowManTarget = new window.Snowman();
  var targetWidthX = window.Snowman.BODY_RADIUS * 2;
  var targetWidthZ = window.Snowman.BODY_RADIUS * 2;
  var targetWidthY = window.Snowman.BODY_RADIUS * 2 + window.Snowman.HEAD_RADIUS * 2;
  snowManTarget.widthX = targetWidthX;
  snowManTarget.widthZ = targetWidthZ;
  snowManTarget.widthY = targetWidthY;
  snowManTarget.mesh.position.x = 250 - Math.random() * 500;
  snowManTarget.mesh.position.z = 250 - Math.random() * 500;

  snowManTarget.counter = 20;
  this.targets[0] = snowManTarget;
  scene.add(snowManTarget.mesh);
};

Game.updateTarget = function () {
  this.targets.forEach(function ( target ) {
    if ( !target.dead ) {
      // target.counter -= 1 / 60;
    }
    if (target.counter < 0) {
      // target.dead = true;
    }
  });
};

Game.message = function( text ) {
  $('#message').text(text);
};

Game.checkTargetCollision = function () {
  var snowManTarget = Game.targets[0];
  this.snowballs.forEach(function ( snowball ) {
    // if ( !snowball.checkedTargetCollision && snowball.tjs.position.y < 2 && Game.check3dCollision( snowManTarget, snowball) ) {
    if ( !snowball.checkedTargetCollision && Game.check3dCollision(snowManTarget, snowball) ) {
      snowball.checkedTargetCollision = true;
      Game.targets[0].dead = true;
      // timePoints = Math.round(snowManTarget.counter * 10) / 10;
      distPoints = Math.round(
         Math.pow(
              snowball.startX - snowManTarget.mesh.position.x,
              2
          ) +
        Math.pow(
            snowball.startZ - snowManTarget.mesh.position.z,
            2
        )
      );
      points = Math.round(distPoints);
      Game.message('Hit the target! Distance squared = ' + distPoints + 'points');
      Game.totalPoints += points;
      $('#score').text(Game.totalPoints);
      Game.explosions.push(
          new ExplodeAnimation(snowManTarget.position.x, snowManTarget.widthZ / 2, snowManTarget.position.z)
      );
      scene.remove(snowball.mesh);
      scene.remove(Game.targets[0].mesh);
      Game.createTarget();
    }
  });
};

Game.checkCollision = function ( rect1, rect2 ) {
  return !(rect1.tjs.position.x + rect1.widthX / 2 <= rect2.tjs.position.x  -  rect2.widthX / 2 ||
      rect1.tjs.position.z - rect1.widthZ / 2  >= rect2.tjs.position.z + rect2.widthZ ||
      rect1.tjs.position.x - rect1.widthX / 2 >= rect2.tjs.position.x + rect2.widthX ||
      rect1.tjs.position.z + rect1.widthZ / 2  <= rect2.tjs.position.z - rect2.widthZ);
};

Game.check3dCollision = function ( rect1, rect2 ) {
 return !(rect1.mesh.position.x + rect1.widthX / 2 <= rect2.mesh.position.x  -  rect2.widthX / 2 ||
    rect1.mesh.position.z - rect1.widthZ / 2  >= rect2.mesh.position.z + rect2.widthZ / 2 ||
    rect1.mesh.position.x - rect1.widthX / 2 >= rect2.mesh.position.x + rect2.widthX / 2 ||
    rect1.mesh.position.z + rect1.widthZ / 2  <= rect2.mesh.position.z - rect2.widthZ / 2 ||
    rect1.mesh.position.y + rect1.widthY   <= rect2.mesh.position.y - rect2.widthY / 2);
};

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
    socket.emit('single-score' , [Game.totalPoints, $('#player-name').val() || 'Anon']);
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
  for ( var i = 1; i <= Math.min(5 , scores.length); i++ ) {
    $('.topscores:nth-of-type(' + i +')').text(scores[i-1][0] + ' ' + scores[i-1][1]);
  }
}

socket.on('connected', function ( a, b, c, scores ) {
  topscores = scores.sort(function(a,b) { return b[0]-a[0] });
  updateTopScores( topscores );

  // regenerate('disconnect');
});

socket.on('topscores', function ( scores) {
   topscores = scores.sort(function(a,b) { return b[0]-a[0] });

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
