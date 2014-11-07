var cxt;
//var canvas;
var incx = 0;
var incy = 0;
var shoot = 0;
var speed = 3;
var imgd;
var rects = [];

  window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


function Player(x,y,w, solid, speedx, speedy) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = w;
  this.speed = speedx
  if(solid === undefined) solid = 1;
    this.solid = solid;
  if(solid === undefined) speedx = 0;
    this.speedx = speedx;
  if(solid === undefined) speedy = 0;
    this.speedy = speedy;
  }

function drawMovers(movers) {
  for (var i in movers) {
      cxt.fillRect(movers[i].x,movers[i].y,movers[i].w,movers[i].h);
      };
    };
  

function createEnvironment (rects) {
  for (var i in rects) {
    cxt.fillRect(rects[i].x,rects[i].y,rects[i].w,rects[i].h);
    };
    }
  
  
function compareRect(R1, R2) {
   return !(R1.x+ R1.w <= R2.x ||
           R1.y >= R2.y + R2.w ||
           R1.x >= R2.x + R2.w ||
           R1.y + R1.w <= R2.y); 
} 
    
    
    
function movePlayer(movers, rects) {
  // console.log(movers.length)
  //player.x = Math.min(Math.max(player.x + incx,0),canvas.width - player.w)
  //player.y = Math.min(Math.max(player.y + incy,0),canvas.height -player.h)
    // for (var j = 0; j < movers.length; j++) {
    // console.log("hi")
      var oldx = movers[0].x
      var oldy = movers[0].y
  
      movers[0].x = Math.min(Math.max(movers[0].x + incx,0),canvas.width -movers[0].w)
      movers[0].y = Math.min(Math.max(movers[0].y + incy,0),canvas.height -movers[0].h)

      for (var j = 1; j < movers.length; j++) {
        console.log(movers.speed)
        movers[j].x = Math.min(Math.max(movers[j].x + movers[j].speed,0),canvas.width -movers[0].w)
      }
  
  for (var i in rects) {
      if (compareRect(movers[0], rects[i])) {
        movers[0].x = oldx;
        movers[0].y = oldy;
      };
    };
    
  }
  
function game() {
  var canvas = document.getElementById("canvas");
  cxt = canvas.getContext("2d");
  var player = new Player(0,0,10);
  var player2 = new Player(20,20,10);
  var centerSQ = new Player(100,100,100);
  var movers = [player];
    
  for (var i = 0; i < 5; i += 1) {
    //create the static boxes which cant moanoever around
    rects[i] = new Player(Math.floor(Math.random()* canvas.width),Math.floor(Math.random()* canvas.height),Math.floor(Math.random()* 100));
    }
  
  //cxt.clearRect(0,0,canvas.width,canvas.height);
  //drawPlayer(player);
  //drawPlayer(centerSQ);
  
  
  createEnvironment (rects)
  var imgdata = cxt.getImageData(0, 0, 400, 400);
   
  drawMovers(movers);
   
     (function animloop(){
      requestAnimFrame(animloop);
      //cxt.clearRect(0,0,canvas.width,canvas.height);
      cxt.putImageData(imgdata, 0, 0);
      movePlayer(movers, rects);
      drawMovers(movers);
      //drawPlayer(rects,1);

      if (shoot == 1) {
        for (var i = 0; i < movers.length; i ++) {
            console.log(movers[i])
        }
        
        var bullet = new Player(movers[0].x,movers[0].y, 5,0, 10,2);
        
        movers.push(bullet);
        shoot = 0;
        }
    })();
     
     
     
     /*
    setInterval (function() {
      cxt.clearRect(0,0,canvas.width,canvas.height);
      
      movePlayer(rects);
      drawPlayer(rects);
      if (shoot == 1) {
        var bullet = new Player(rects[0].x,rects[0].y, 5,0);
        
        rects.push(bullet);
        shoot = 0;
        }
      //movePlayer(player);
      //drawPlayer(player);
      //drawPlayer(centerSQ);
    
    }, 1000/1000);
    //*/
}

window.addEventListener('keydown', function(event) {

  switch (event.keyCode) {
    case 37: // Left
      incx = Math.max(incx-speed,-speed);
      break;

    case 38: // Up
      incy = Math.max(incy-speed,-speed);
      break;

    case 39: // Right
      incx = Math.min(incx+speed,speed)
      break;

    case 40: // Down
      incy = Math.min(incy+speed,speed)
      break;
    case 32:

      shoot = 1;
    break;
    
  }
}, false)

window.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      incx = incx + speed;//Math.max(incx-0.2,-3);
      break;
    case 38: // up
      incy = incy +speed;//Math.max(incx-0.2,-3);
      break;

    case 39: // Right
      incx = incx -speed; //Math.min(incx+0.2,3)
      break;
      
    case 40: // down
      incy = incy -speed;//Math.max(incx-0.2,-3);
      break;

      };
    
}, false)

game();