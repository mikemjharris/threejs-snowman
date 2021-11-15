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

  Arena.prototype.addTo = function( scene ) {
    scene.add(this.mesh);
  };

  Arena.PLANE_SIZE = PLANE_SIZE;

  window.Arena = Arena;

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

  function Tree() {
    this.mesh = wholeTree.clone();
  }

  window.Tree = Tree;

})(window, window.THREE);

(function (window, THREE) {

  var NOS_TREES = 400;
  var forest = new THREE.Group();

  for ( var i = 0; i < NOS_TREES; i++ ) {
    var tree = new window.Tree();
    var sign = Math.random() < 0.5 ? -1 : 1;
    if ( i < NOS_TREES / 2 ) {
      tree.mesh.position.x = Math.random() * ( window.Arena.PLANE_SIZE * 0.5 ) * sign;
      tree.mesh.position.z = ( window.Arena.PLANE_SIZE / 2 ) - Math.random() * 50;
      if ( i < NOS_TREES / 4 ) {
        tree.mesh.position.z *= -1;
      }
    } else {
      tree.mesh.position.z = Math.random() * ( window.Arena.PLANE_SIZE * 0.5 ) * sign;
      tree.mesh.position.x = window.Arena.PLANE_SIZE / 2 - Math.random() * 50;
      if ( i < NOS_TREES * 3 / 4 ) {
        tree.mesh.position.x *= -1;
      }
    }

    var treeScale = ( Math.random() + 0.5 ) * 1;
    tree.mesh.scale.set(treeScale, treeScale, treeScale);
    forest.add(tree.mesh);
  }

  function Forest() {
    this.mesh = forest;
  }

  window.Forest = Forest;

})(window, window.THREE);

(function (window, THREE) {
  var NOS_FLAKES = 1000;

  var snowGeometry = new THREE.Geometry();
  var snowMaterial = new THREE.PointCloudMaterial({ color: 0xffffff });
  var particles = [];

  for ( var i = 0; i < NOS_FLAKES; i++ ) {
    var particle = new THREE.Vector3(
      ( Math.random() - 0.5 ) * window.Arena.PLANE_SIZE,
      Math.random() * 200,
      ( Math.random() - 0.5 ) * window.Arena.PLANE_SIZE
    );
    snowGeometry.vertices.push(particle);
    particles.push(particle);
  }

  function SnowStorm() {
    this.mesh = new THREE.PointCloud(snowGeometry, snowMaterial );
  }

  SnowStorm.prototype.update = function () {
    window.scene.remove(this.mesh);
    snowGeometry = new THREE.Geometry();
    for ( var i = 0; i < particles.length; i++ ) {
      if ( particles[i].y < 0 ) {
        particles[i].y = 100;
      }
      particles[i].y -= ( 0.2 * ( 1 + Math.sin(i) ) );
      snowGeometry.vertices.push(particles[i]);
    }
    this.mesh = new THREE.PointCloud(snowGeometry, snowMaterial);
    window.scene.add(this.mesh);
  };

  window.SnowStorm = SnowStorm;

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
var dirs = [];

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
    this.counter = 0;
    this.walkSlowness = 15;
    this.scaleShrinkage = 40;

    if ( options ) {
      this.move = options.move;
      this.playerName = options.playerName;

      if ( options.keysEnabled ) {
        window.addEventListener('keydown', function( event ) {
          switch ( event.keyCode ) {
            case 37: // left
              self.rotateDirection(0.02);
            break;
            case 39: // right
              self.rotateDirection(-0.02);
            break;
            case 38: // up
              self.moveDirection(2);
            break;
            case 40: // down
              self.moveDirection(-2);
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
              var snowball = self.makeSnowball(self.snowballPower);
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
    this.mesh.position.y = 0.5 * Math.sin( this.counter / this.walkSlowness );

    this.mesh.scale.set(
      1 + Math.sin(this.counter / this.walkSlowness) / this.scaleShrinkage,
      1 + Math.cos(this.counter /  this.walkSlowness) / this.scaleShrinkage,
      1 + Math.sin(this.counter /  this.walkSlowness) / this.scaleShrinkage
    );

    this.counter++;

    if ( this.snowBallPowerUp && this.snowballPower < SNOWBALL_POWER_LIMIT ) {
      this.snowballPower += 0.1;
    }
  };

  Player.prototype.makeSnowball = function( power ) {
    return new Snowball(this.id, this.mesh.position, this.mesh.rotation.y, power);
  };

  Object.defineProperty(Player.prototype, 'position', {
    get: function position() {
      return this.mesh.position;
    },
    set: function position( value ) {
      this.mesh.position = value;
    }
  });

  window.Player = Player;

})(window, window.THREE, window.Snowman, window.Snowball);

(function (window, THREE) {

  function FollowCamera ( player ) {
    this.player = player;
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  FollowCamera.prototype.update = function() {
    this.camera.position.x = this.player.mesh.position.x - 80 * Math.sin(this.player.mesh.rotation.y);
    this.camera.position.z = this.player.mesh.position.z - 80 * Math.cos(this.player.mesh.rotation.y);
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

var canvas = document.getElementById('map-canvas');
var ctx = canvas.getContext('2d');

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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.arc(
    canvas.width - ( this.players[0].mesh.position.x + 500 ) * canvas.width / 1000,
    canvas.width - ( this.players[0].mesh.position.z + 500 ) * canvas.width / 1000,
    3,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = '#0000FF';
  ctx.fill();
  ctx.stroke();

  ctx.moveTo(
    canvas.width - ( this.players[0].mesh.position.x + 500 ) * canvas.width / 1000,
    canvas.width - ( this.players[0].mesh.position.z + 500 ) * canvas.width / 1000
  );
  ctx.lineTo(
    canvas.width - ( this.players[0].mesh.position.x + 500 ) * canvas.width / 1000 - 10 * Math.sin(this.players[0].mesh.rotation.y ),
    canvas.width - (this.players[0].mesh.position.z + 500) * canvas.width / 1000 - 10 * Math.cos(this.players[0].mesh.rotation.y)
  );
  ctx.stroke();

  this.snowballs.forEach(function ( snowball ) {
    ctx.beginPath();
    ctx.arc(
      canvas.width - ( snowball.mesh.position.x + 500 ) * canvas.width / 1000,
      canvas.width - (snowball.mesh.position.z + 500) * canvas.width / 1000,
      1,
      0,
      2 * Math.PI
    );
    ctx.stroke();
  });

  ctx.beginPath();
  ctx.arc(
    canvas.width - ( this.targets[0].mesh.position.x + 500 ) * canvas.width / 1000,
    canvas.width - ( this.targets[0].mesh.position.z + 500 ) * canvas.width / 1000,
    3,
    0,
    2 * Math.PI
  );
  ctx.fillStyle = '#FF0000';
  ctx.fill();
  ctx.stroke();
  ctx.stroke();

  this.players.forEach(function ( player ) {
    var posX = player.position.x;
    var posZ = player.position.z;
    player.update();
    var allowMoveX = Math.abs(player.position.x) + 10 < Arena.PLANE_SIZE / 2;
    if ( !allowMoveX ) {
      player.position.x = posX;
    }
    var allowMoveZ = Math.abs(player.position.z) + 10 < Arena.PLANE_SIZE / 2;
    if ( !allowMoveZ ) {
      player.position.z = posZ;
    }
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
    };
    if (target.counter < 0) {
      // target.dead = true;
    };
  });
};

Game.message = function( text ) {
  $('.message').html(text);
};

Game.checkTargetCollision = function () {
  var snowManTarget = Game.targets[0];
  this.snowballs.forEach(function ( snowball ) {
    // if ( !snowball.checkedTargetCollision && snowball.tjs.position.y < 2 && Game.check3dCollision( snowManTarget, snowball) ) {
    if ( !snowball.checkedTargetCollision && Game.check3dCollision(snowManTarget, snowball) ) {
      snowball.checkedTargetCollision = true;
      Game.targets[0].dead = true;
      // timePoints = Math.round(snowManTarget.counter * 10) / 10;
      var distPoints = Math.round(
         Math.pow(
              snowball.startX - snowManTarget.mesh.position.x,
              2
          ) +
        Math.pow(
            snowball.startZ - snowManTarget.mesh.position.z,
            2
        )
      );
      var points = Math.round(distPoints);
      Game.message('Hit the target! Distance to target ^ 2 = ' + addCommas(distPoints) + ' points');
      Game.totalPoints += points;
      $('#score').text(addCommas(Game.totalPoints));
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
  return !(rect1.tjs.position.x + rect1.widthX / 2 <= rect2.tjs.position.x -  rect2.widthX / 2 ||
      rect1.tjs.position.z - rect1.widthZ / 2  >= rect2.tjs.position.z + rect2.widthZ ||
      rect1.tjs.position.x - rect1.widthX / 2 >= rect2.tjs.position.x + rect2.widthX ||
      rect1.tjs.position.z + rect1.widthZ / 2  <= rect2.tjs.position.z - rect2.widthZ);
};

Game.check3dCollision = function ( rect1, rect2 ) {
 return !(rect1.mesh.position.x + rect1.widthX / 2 <= rect2.mesh.position.x -  rect2.widthX / 2 ||
    rect1.mesh.position.z - rect1.widthZ / 2  >= rect2.mesh.position.z + rect2.widthZ / 2 ||
    rect1.mesh.position.x - rect1.widthX / 2 >= rect2.mesh.position.x + rect2.widthX / 2 ||
    rect1.mesh.position.z + rect1.widthZ / 2  <= rect2.mesh.position.z - rect2.widthZ / 2 ||
    rect1.mesh.position.y + rect1.widthY   <= rect2.mesh.position.y - rect2.widthY / 2);
};

var topscores = [];
var socket = io(window.location.origin);

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
  console.log('connected')
  updateTopScores( scores );
});

socket.on('topscores', function ( scores ) {
  updateTopScores( scores );
});
