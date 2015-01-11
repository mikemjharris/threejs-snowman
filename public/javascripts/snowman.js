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
