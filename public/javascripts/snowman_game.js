var socket = io.connect(window.location.hostname);
socket.on('connected', function(socket_id){
    console.log(socket_id)
  });



  var incx = 0;
  var incz = 0;
  var incRot = 0
  var snowballs = []
  var snowBallSize = 2
  var snowballSpeed = 5
  var snowmanSpeed = 2
  var cameraY = 0
  var cameraRotate = 0
  var cameraRotateInc = 0
  var cameraZoom = 0

  var b = 0
  var c = 0
    var snowballGeometry = new THREE.SphereGeometry(snowBallSize,30,30);
    var snowballMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});

  function fireSnowball() {
        snowballs.push( new THREE.Mesh(snowballGeometry,snowballMaterial));

        snowballs[snowballs.length -1].direction =  mesh.rotation.y
        snowballs[snowballs.length -1].position.x = mesh.position.x + Math.sin(snowballs[snowballs.length -1].direction)*bodyRadius;
        snowballs[snowballs.length -1].position.y = bodyRadius
        snowballs[snowballs.length -1].position.z = mesh.position.z + Math.cos(snowballs[snowballs.length -1].direction)*bodyRadius;

        scene.add(snowballs[snowballs.length - 1])
  }

  function compareRect(R1, R2) {
   return !(R1.x+ bodyRadius*2  <= R2.x + cubeSide/ 2 ||
           R1.z - bodyRadius*2  >= R2.z - cubeSide/2 ||
           R1.x >= R2.x + cubeSide ||
           R1.z + bodyRadius*2  <= R2.z + cubeSide/2);
  }

    // 82 70
  function eventListeners () {
    window.addEventListener('keydown', function(event) {
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
          incRot =  Math.min(incRot + 0.1,  0.1)
          break;
        case 39: // right
          incRot =  Math.max(incRot - 0.1,  -0.1)
          break;
        case 38: // up
          incx =  Math.min(incx + 1,  1)
          break;
        case 40: // down
          incx =  Math.max(incx - 1,  -1)
          break;
        case 90: // z
          incRot =  Math.min(incRot + 0.1,  0.1)
          break;
        case 88: // x
          incRot =  Math.max(incRot - 0.1,  -0.1)
          break;
        case 32: // spacebar
          fireSnowball()
          break;
        }
      }, false)

   window.addEventListener('keyup', function(event) {
    switch (event.keyCode) {
      case 37: // left
      incRot =  Math.max(incRot - 0.1,  -0.1)
        //incz =  Math.max(incz - 1,  -1)
        break;
      case 39: // right
        incRot =  Math.min(incRot + 0.1,  +0.1)
        // incz =  Math.min(incz + 1,  1)
        break;
      case 38: // up
        incx =  Math.max(incx - 1,  -1)
        break;
      case 40: // down
      incx =  Math.min(incx + 1,  1)
        break;
      case 90: // z
        incRot =  Math.max(incRot - 0.1,  -0.1)
        break;
      case 88: // x
        incRot =  Math.min(incRot + 0.1,  +0.1)
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
    }, false)
}

      // document.getElementById('body-size').onchange = function(el) {
      //   bodyRadius = this.value
      // }

      // document.getElementById('head-size').onchange = function() {
      //   if( head) {
      //     scene.remove(head)
      //   }


      //   headRadius = this.value

      //   headGeometry = new THREE.SphereGeometry(headRadius,30,30);
      //   headMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
      //   head = new THREE.Mesh(headGeometry,headMaterial);

      //   head.position.x=0;
      //   head.position.y= (parseInt(bodyRadius)*1.75 + parseInt(headRadius));
      //   head.position.z=0;
      //   // // add the sphere to the scene
      //   scene.add(head);

      // }
    // once everything is loaded, we run our Three.js stuff.
    // function init() {

        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();

        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

        // create a render and set the size
        var renderer = new THREE.WebGLRenderer();
        renderer.setClearColor(new THREE.Color(0xEEEEEE));
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.shadowMapEnabled = true;

        // show axes in the screen
        // var axes = new THREE.AxisHelper( 200 );
        // scene.add(axes);

        // create the ground plane
        var planeGeometry = new THREE.PlaneGeometry(500,500);
        var planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff });
        var plane = new THREE.Mesh(planeGeometry,planeMaterial);

        // rotate and position the plane
        plane.rotation.x=-0.5*Math.PI;
        plane.position.x=0
        plane.position.y=0
        plane.position.z=0

        plane.receiveShadow = true;

        // add the plane to the scene
        scene.add(plane);

        // scene.add(new THREE.AmbientLight(0xfff666));

        // create a sphere
        var bodyRadius = 9
         mesh = new THREE.Group();

        var bodyGeometry = new THREE.SphereGeometry(bodyRadius,30,30);
        var bodyMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
        var body = new THREE.Mesh(bodyGeometry,bodyMaterial);


  body.castShadow = true;
  // body.receiveShadow = false;
        // position the sphere
        // sphere.rotation.x = 0.1*Math.PI
        body.position.x=0;
        body.position.y=bodyRadius;
        body.position.z=0;

        // add the sphere to the scene
        scene.add(body);
        mesh.add(body)



        // position the sphere
        var headRadius = 4

        var headGeometry = new THREE.SphereGeometry(headRadius,30,30);
        var headMaterial = new THREE.MeshLambertMaterial({color: 0xffffff, wireframe: false});
        var head = new THREE.Mesh(headGeometry,headMaterial);

        head.position.x=0;
        head.position.y= (parseInt(bodyRadius)*2 + parseInt(headRadius));
        head.position.z=0;
        body.castShadow = true;
        // // add the sphere to the scene
        scene.add(head);
        mesh.add(head)


      // var combined = new THREE.Geometry();

      // THREE.GeometryUtils.setMaterialIndex(body.geometry, 0);
      // THREE.GeometryUtils.setMaterialIndex(head.geometry, 1);
      // THREE.GeometryUtils.setMaterialIndex(hat.geometry, 2);

      // THREE.GeometryUtils.merge( combined, body );
      // THREE.GeometryUtils.merge( combined, head );
      // THREE.GeometryUtils.merge( combined, hat );



      // group = new THREE.Mesh(combined, new THREE.MeshFaceMaterial( materials ));

      // scene.add(group)
      // group.position.x = 30


        var nosButtons = 3
        var buttons = []
        for (var i = 0; i < nosButtons; i++ ) {
          var buttonRadius = 1
          var buttonGeometry = new THREE.SphereGeometry(buttonRadius,30,30);
          var buttonMaterial = new THREE.MeshLambertMaterial({color: 0x000000, wireframe: false});
          buttons[i] = new THREE.Mesh(buttonGeometry,buttonMaterial);


          buttonAngle = (i+3)*Math.PI / 6
          buttons[i].position.x = 0
          buttons[i].position.y =  bodyRadius * ( 1 - Math.cos( buttonAngle) )
          buttons[i].position.z = bodyRadius * Math.sin( buttonAngle) + buttonRadius * 0.8
          // buttons[i].rotation.x = 1.5* Math.PI
          buttons[i].castShadow = true;

          // THREE.GeometryUtils.merge( combined, buttons[i] );
          scene.add(buttons[i])
          mesh.add(buttons[i])


        }
        // scene.remove( head)
        var eyes = []
        for (var i = 0; i < 2; i++) {
          var eyeRadius = 0.5
          var eyeGeometry = new THREE.SphereGeometry(eyeRadius,30,30);
          var eyeMaterial = new THREE.MeshLambertMaterial({color: 0x666666, wireframe: false});
          eyes[i] = new THREE.Mesh(eyeGeometry,eyeMaterial);

          eyeAngelZ =   Math.PI * 3/8
          eyeAngelXY =  Math.PI * 5/8

          eyes[i].position.x =  (-1 + 2*i)*headRadius * Math.cos((-1 + 2*i)*eyeAngelZ) + eyeRadius*(-1 + 2*i)/5
          eyes[i].position.z = headRadius + eyeRadius + Math.cos(eyeAngelXY) * Math.sin(  eyeAngelZ )*headRadius
          eyes[i].position.y = bodyRadius * 2 + headRadius + Math.sin(eyeAngelXY) * Math.cos(  eyeAngelZ )*headRadius;

          scene.add(eyes[i])
          mesh.add(eyes[i])


        }





        var material = new THREE.LineBasicMaterial({
            color: 0xA52A2A
          });


          var arm1 = new THREE.Geometry();
          arm1.vertices.push(new THREE.Vector3(0 , bodyRadius  , 0));
          arm1.vertices.push(new THREE.Vector3(bodyRadius * 1.5 , bodyRadius* 1.5, 0));
          arm1.vertices.push(new THREE.Vector3(bodyRadius * 1.7, bodyRadius * 2, 0));

          var arm2 = new THREE.Geometry();
          arm2.vertices.push(new THREE.Vector3(0 , bodyRadius  , 0));
          arm2.vertices.push(new THREE.Vector3(-bodyRadius * 1.5 , bodyRadius* 1.5, 0));
          arm2.vertices.push(new THREE.Vector3(-bodyRadius * 1.7, bodyRadius * 2, 0));

          var line1 = new THREE.Line(arm1, material);
          var line2 = new THREE.Line(arm2, material);
          scene.add(line1)
          scene.add(line2)

          mesh.add(line1)
          mesh.add(line2)

        // var mesh = new THREE.Mesh( combined, new THREE.MeshLambertMaterial({color: 0xFF69B4, wireframe: false}) );


        // var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        // directionalLight.position.set(-0.5, 1.2, 1).normalize();
        // directionalLight.castShadow = true;
        // directionalLight.shadowDarkness = 0.5;
        // scene.add(directionalLight);
          var hatHeight = 6
          var hatMaterial = new THREE.MeshLambertMaterial({color: 0x333333, wireframe: false})
          var hat = new THREE.Mesh(new THREE.CylinderGeometry(3, 3, hatHeight, 40), hatMaterial);

          var hatRimHeight = 1
          var hatRim = new THREE.Mesh(new THREE.CylinderGeometry(4, 4, hatRimHeight, 40), hatMaterial);
          // hat.overdraw = true;
          hat.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatHeight / 2
          hatRim.position.y = bodyRadius * 2  +  headRadius * 1.75 + hatRimHeight / 2

          scene.add(hat);
          scene.add(hatRim);
          mesh.add(hat)
          mesh.add(hatRim);
          // THREE.GeometryUtils.merge( combined, hat );
          // THREE.GeometryUtils.merge( combined, hatRim );

          var noseHeight = 3
          var nose = new THREE.Mesh(new THREE.CylinderGeometry(1, 0, noseHeight, 40), new THREE.MeshLambertMaterial({color: 0xFFA500, wireframe: false}));

          // nose.rotation.x =  Math.PI * 2
          nose.rotation.z =  Math.PI / 2
          nose.rotation.y =  Math.PI * 1.5
          nose.position.z = headRadius + noseHeight / 2
          nose.position.y = bodyRadius * 2  +  headRadius

          scene.add(nose)
          mesh.add(nose)




          // THREE.GeometryUtils.merge( combined, nose );


        camera.position.x = 170;
        camera.position.y = 60;
        camera.position.z = 170;
        camera.lookAt(scene.position);



         var light;

    light = new THREE.DirectionalLight(0xdfebff, 1.75);
    light.position.set(100, 100, 100);
    light.position.set(100, 800, -100);
    light.position.multiplyScalar(1.3);

    light.castShadow = true;
    // light.shadowCameraVisible = true;

    // light.shadowMapWidth = 512;
    // light.shadowMapHeight = 512;

    var d = 500;

    // light.shadowCameraLeft = -d;
    // light.shadowCameraRight = d;
    // light.shadowCameraTop = d;
    // light.shadowCameraBottom = -d;

    light.shadowCameraFar = 1000;
    light.shadowDarkness = 0.2;

    scene.add(light);

        var cubeSide = 10
        var cubeGeometry = new THREE.BoxGeometry(cubeSide,cubeSide,cubeSide);
        var cubeMaterial = new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture('../images/m.gif')
        });
        var cubes = []


        var nosCubes = 10
        for (var i = 0; i < nosCubes; i++) {
            cubes[i] = new THREE.Mesh(cubeGeometry, cubeMaterial);
            randX = Math.random() * 500 - 250;
            randZ = Math.random() * 500 - 250;
            cubes[i].position.x=randX;
            cubes[i].position.y= Math.random() * cubeSide/2 ;
            cubes[i].position.z=randZ;
            cubes[i].castShadow = true;


            scene.add(cubes[i]);
        }


        // var cubebigSide = 10
        var bigCubeGeometry = new THREE.BoxGeometry(50,50,300);
        var bigCubeMaterial = new THREE.MeshLambertMaterial({
          map: THREE.ImageUtils.loadTexture('../images/mammal_logo.jpg')
        });

        var bigCube = new THREE.Mesh( bigCubeGeometry, bigCubeMaterial );
        bigCube.position.y = 100
        bigCube.position.x = 0
        bigCube.position.z = -300
        bigCube.rotation.y = Math.PI/2

        scene.add( bigCube )

        mesh.castShadow = true;

        mesh.position.z = 60
        // mesh.rotation.y = Math.PI
        scene.add( mesh )


        var enemy = mesh.clone()

         enemy.scale.x = 5
         enemy.scale.y = 5
         enemy.scale.z = 5
         enemy.position.x = -100
        enemy.position.z = -50
        enemy.rotation.y = 0.45
            scene.add(enemy)


        // scene.add(enemy)



        // add the cube to the scene


       //  controls = new THREE.OrbitControls( camera );
       // controls.damping = 0.2;
       //  controls.addEventListener( 'change', render );


    //

        // add the output of the renderer to the html element
        document.getElementById("canvas-view").appendChild(renderer.domElement);

        // render the scene
        // renderer.render(scene, camera);


    // };
    var x = 0
    var targetRadius = 5

    window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth , window.innerHeight );

}
    camY = camera.rotation.y
    camz = camera.rotation.z
    camx = camera.rotation.x
    function render() {
      requestAnimationFrame( render );
      x += 0.02;


      if(body.geometry.parameters.radius < bodyRadius) {
          scene.remove(body);
          bodyGeometry = new THREE.SphereGeometry(body.geometry.parameters.radius + 0.1,30,30);

          body = new THREE.Mesh(bodyGeometry,bodyMaterial);
          body.position.y= body.geometry.parameters.radius*0.75;
          head.position.y= (parseInt(body.geometry.parameters.radius)*1.75 + parseInt(headRadius));
          scene.add(body);

        }



       if(body.geometry.parameters.radius > bodyRadius) {
          scene.remove(body);
          bodyGeometry = new THREE.SphereGeometry(body.geometry.parameters.radius - 0.1,30,30);

          body = new THREE.Mesh(bodyGeometry,bodyMaterial);
          body.position.y= body.geometry.parameters.radius*0.75;
          head.position.y= body.position.y*(1.75/0.75) + parseInt(headRadius);

          scene.add(body);

        }


          var oldx = mesh.position.x
          var oldz = mesh.position.z

          mesh.position.x = mesh.position.x + incx* Math.sin(mesh.rotation.y)
          mesh.position.z = mesh.position.z + incx* Math.cos(mesh.rotation.y)
          mesh.rotation.y = mesh.rotation.y + incRot


          for (var i=0; i < snowballs.length; i++) {
              if (snowballs[i].position.z > 250 || snowballs[i].position.z < -250  ||
                snowballs[i].position.x > 250 || snowballs[i].position.x < -250) {
                scene.remove(snowballs[i])
                // delete snowballs[i]
              } else {
                // snowballs[snowballs.length -1].direction
                snowballs[i].position.x = Math.sin(snowballs[i].direction)*snowballSpeed + snowballs[i].position.x
                snowballs[i].position.z = Math.cos(snowballs[i].direction)*snowballSpeed + snowballs[i].position.z
              }
          }

          for (var i in cubes) {
              if (compareRect(mesh.position, cubes[i].position)) {
                  mesh.position.x = oldx;
                  mesh.position.z  = oldz;
              };
      };


        camera.position.y =  camera.position.y + cameraY / 5
        camera.lookAt(scene.position);

        // ) )

        camera.position.x = camera.position.x + Math.sin(camera.rotation.y)*cameraZoom
        camera.position.z = camera.position.z + Math.cos(camera.rotation.y)*cameraZoom

        distanceFromCenter = Math.sqrt((camera.position.x*camera.position.x ) + (camera.position.z*camera.position.z ))
        cameraRotate = cameraRotate + cameraRotateInc
        camera.position.x = Math.sin(cameraRotate/50)*distanceFromCenter
        camera.position.z = Math.cos(cameraRotate/50)*distanceFromCenter

      //camera rotation
      // camera.rotation.y = camY + 0.02*Math.sin(x)
      // camera.rotation.z = camz + 0.02*Math.cos(x/2.2)
      // camera.rotation.x = camx + 0.04*Math.cos(x/3.2)
      bigCube.rotation.x = x/2
      light.position.set(100 + 100*Math.sin(x/10), 100 , 100 + 100*Math.cos(x/10));
      renderer.render( scene, camera );
}
render();

eventListeners()


