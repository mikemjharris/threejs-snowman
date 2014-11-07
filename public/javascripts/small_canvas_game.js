// var socket = io.connect('http://localhost:3000');
var socket = io.connect(window.location.hostname);
var cxt;
var incx = 0;
var incy = 0;
var bullet_speed = 6
var lastincx = 0 
var lastincy = bullet_speed

var shoot = 0;
var speed = 3;
var imgd;
var rects = [];
var movers = [];
var client_id 
var player_size = 50;
var shots = 0 

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



socket.on('connected', function(socket_id, existing_movers){
      console.log(socket_id)
      console.log(existing_movers)
      client_id = socket_id
      
      $.when(listMovers(existing_movers)).then(game(existing_movers))      
     

      

  }); 


function listMovers(existing_movers)  {
   for(var i = 0; i < existing_movers.length; i ++) {
        if(existing_movers[i].client_id.substring(0,6) != "bullet") {
          var player_name = existing_movers[i].player_name
          var player_image = existing_movers[i].player_image
          var player_id = existing_movers[i].client_id

          $img = $('<img>')
          $img.attr('src', player_image)
          $li = $('<li>')
          $li.attr("id", player_id).addClass("player_list").text(player_name)
          $li.prepend($img)
          $('#current_players ul').append($li)
          }
        };
}  

socket.on('move', function(direction){
      console.log(direction)
  });

socket.on('bullet', function(bullet){
     movers.push(bullet)
  });


socket.on('player_removed', function(player_id, message){
  for(var i = 0; i < movers.length; i ++) {
    if(movers[i].client_id == player_id){
      movers.splice(i,1);
    }
  }
  $("#" + player_id).remove();
  $('#status').html(message)
  console.log("MEsssage::" + message)
  
})

function removePlayer(player_id) {
  for(var i = 0; i < movers.length; i ++) {
    if(movers[i].client_id == player_id){
      movers.splice(i,1);
    }
  }
}


socket.on('new_player', function(new_player){
      movers.push(new_player)
      var player_name = new_player.player_name
      var player_image = new_player.player_image
      var player_id = new_player.client_id

      $img = $('<img>')
      $img.attr('src', player_image)
      $li = $('<li>')
      $li.attr("id", player_id).addClass("player_list").text(player_name)
      $li.prepend($img)
      $('#current_players ul').append($li)

  });

socket.on('playerposition', function(position){
      for (var i = 0; i < movers.length; i++) {
         if(movers[i].client_id == position.client_id) {
            movers[i] = position;
          }
      
      }
  });



$('#join_game').on("click", function(){
  var player_name = $('#player_name_input').val()
  var player_image = "http://t1.gstatic.com/images?q=tbn:ANd9GcSxRa0xj0RzhGMM2VBK8kXXZHfdZPc7nV4p_cA0e1xV6Q2EHJqFbw"
  // var player_image = "../images/mike.png"
  var start_x = Math.random()*700
  var start_y = Math.random()*400
  var new_player = new Player(start_x,start_y,player_size,1,0,0,client_id, player_name, player_image);
  
  $img = $('<img>')
  $img.attr('src', player_image)
  $li = $('<li>')
  $li.attr("id",client_id).addClass("player_list").text(player_name)
  $li.prepend($img)
  $('#current_players ul').append($li)
  $('#join_game').remove();
  movers.push(new_player)
  socket.emit("new_player", new_player)  
})



$('#join_game_twitter').on("click", function(){
  var player_name = $('#player_name').html()
  var player_image = $('#player_img').attr('src');
  var start_x = Math.random()*700
  var start_y = Math.random()*400

  var new_player = new Player(start_x,start_y,player_size,1,0,0,client_id, player_name, player_image);
  
  $img = $('<img>')
  $img.attr('src', player_image)
  $li = $('<li>')
  
  $li.attr("id",client_id).addClass("player_list").text(player_name)
  $li.prepend($img)
  $('#current_players ul').append($li)
  $('#join_game_twitter').remove();
  movers.push(new_player)
  socket.emit("new_player", new_player)  
})


$('#change_pos').on("click", function(){
  movers[0].x = 0
  movers[0].y = 0
})

function Player(x,y,w, solid, speedx, speedy, client_id, player_name, player_image, image_id) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = w;
  // this.speed = speedx;
  this.solid = solid;
  this.speedx = speedx;
  this.speedy = speedy;
  this.client_id = client_id;
  this.player_name = player_name
  this.player_image = player_image;
  if(client_id.substring(0,6) == "bullet") {
    this.image_id = "bullet";
  } else {
    this.image_id = client_id;
  }
  

  // this.speed = speed
  }

function drawMovers(movers) {  
  for (var i = 0; i < movers.length ; i++) {
          player_img = $('#' + movers[i].image_id + " img")
          cxt.drawImage(player_img[0], movers[i].x, movers[i].y, movers[i].w, movers[i].w);
    };
};






function movePlayer(movers) {
      // var oldx = movers[0].x
      // var oldy = movers[0].y
      for (var i = 0 ; i < movers.length; i ++) { 
        if (movers[i].client_id == client_id) {
          if (!(movers[i].speedx === incx && movers[i].speedy === incy)) {
            movers[i].speedx = incx
            movers[i].speedy = incy
            socket.emit('playerposition', movers[i]);
          } 
        };


        movers[i].x = Math.min(Math.max(movers[i].x + movers[i].speedx,0),canvas.width - movers[i].w )
        movers[i].y = Math.min(Math.max(movers[i].y + movers[i].speedy,0),canvas.height - movers[i].h )


        if (movers[i].client_id.substring(0,6) == "bullet") {
           if(movers[i].x == 0 || movers[i].x == (canvas.width - movers[i].w) || movers[i].y == 0 || movers[i].y == (canvas.height - movers[i].w) ) {
                // console.log("bullet hit side")
                // console.log(movers[i].image_id)
                removePlayer(movers[i].client_id)
                shots = 0
           }
        }
      }
      
  }
  

function findPlayer(id) {
    for (var i = 0 ; i < movers.length; i ++) {
       if (movers[i].client_id == id) {
          return movers[i]  
        }
    }
}


  function compareRect(R1, R2) {
   return !(R1.x+ R1.w <= R2.x ||
           R1.y >= R2.y + R2.w ||
           R1.x >= R2.x + R2.w ||
           R1.y + R1.w <= R2.y); 
} 

function checkCollisions(movers) {
  to_remove = []
  
  for(var i = 0; i < movers.length; i++) {
    for(var j = i; j < movers.length; j++) {
      if(i !== j) {
          if (compareRect(movers[i], movers[j]) && (movers[j].client_id.substring(0,6) == "bullet" || movers[i].client_id.substring(0,6) == "bullet") ) {
            to_remove.push([movers[i].client_id, movers[j].client_id])
             console.log(to_remove) 

          }
      }
    }
  }
  
  for(var k = 0; k < to_remove.length; k++) {
  
    removePlayer(to_remove[k][0])
    removePlayer(to_remove[k][1])
  }
}





function game(players) {

  var canvas = document.getElementById("canvas");
  cxt = canvas.getContext("2d");

  if(typeof players !== 'undefined'){
    movers = players;
  } else {
    var new_player = new Player(0,0,player_size,1,0,0,client_id);
    movers = [new_player];
  }


  
  var imgdata = cxt.getImageData(0, 0, 700, 400);
   
  drawMovers(movers);

  
  
  
     (function animloop(){
      requestAnimFrame(animloop);
      cxt.putImageData(imgdata, 0, 0);
      movePlayer(movers);
      drawMovers(movers);
      checkCollisions(movers) ;

    })();
 return new_player;
}


 // function sign(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; }


window.addEventListener('keydown', function(event) {

  switch (event.keyCode) {
    case 37: // Left
      incx = Math.max(incx-speed,-speed);
      lastincx = incx * bullet_speed / speed
      lastincy = incy * bullet_speed / speed
      // console.log(movers)
      break;

    case 38: // Up
      incy = Math.max(incy-speed,-speed);
      lastincx = incx * bullet_speed / speed
      lastincy = incy * bullet_speed / speed
      // console.log(movers)
      break;

    case 39: // Right
      incx = Math.min(incx+speed,speed);
      lastincx = incx * bullet_speed / speed
      lastincy = incy * bullet_speed / speed
      
      // console.log(movers)
      break;

    case 40: // Down
      incy = Math.min(incy+speed,speed)
      lastincx = incx * bullet_speed / speed
      lastincy = incy * bullet_speed / speed
      
      // console.log(movers)
      break;
    case 32: //space bar
      // shoot = 1;
      if (shots == 0) {
        var thisPlayer = findPlayer(client_id)
        console.log(thisPlayer)
        console.log(lastincx)
        console.log(lastincy)
        if (lastincx < 0){
            var bullet_x = thisPlayer.x - player_size / 2
          } else if(lastincx > 0) {
            var bullet_x = thisPlayer.x + player_size 
          } else {
            var bullet_x = thisPlayer.x + player_size / 4
          }
        if (lastincy < 0){
            var bullet_y = thisPlayer.y - player_size / 2
          } else if(lastincy > 0) {
            var bullet_y = thisPlayer.y + player_size 
          } else {
            var bullet_y = thisPlayer.y + player_size / 4
          }
        

        var new_bullet = new Player(bullet_x,bullet_y, player_size/2,bullet_speed,lastincx,lastincy,"bullet_" + thisPlayer.client_id, "bullet", thisPlayer.image);
        socket.emit("bullet", new_bullet)
        console.log(new_bullet)
        movers.push(new_bullet)
        shots = 1
      }
    break;
    
  }
}, false)

window.addEventListener('keyup', function(event) {
  switch (event.keyCode) {
    case 37: // Left
      incx = incx + speed;//Math.max(incx-0.2,-3);
      if(lastincy !== 0) {
        lastincx = 0
      } 
      break;
    case 38: // up
      incy = incy + speed;//Math.max(incx-0.2,-3);
      if(lastincx !== 0) {
        lastincy = 0
      } 
      break;

    case 39: // Right
      incx = incx -speed; //Math.min(incx+0.2,3)
      if(lastincy !== 0) {
        lastincx = 0
      } 
      break;
      
    case 40: // down
      incy = incy -speed;//Math.max(incx-0.2,-3);
      if(lastincx !== 0) {
        lastincy = 0
      } 
      break;

      };
    
}, false)



