var engine;
var world;
var boxes = [];
var score = 0;
var lives = 5;

function setup() {
  createCanvas(windowWidth, windowHeight,);
  engine = Matter.Engine.create();
  world = engine.world;
  Matter.Engine.run(engine);
  setInterval(falling,500);
  setInterval(gameOver, 1);


}

function gameOver(){
  if(lives <= 0) {
    window.location.href = "gameOver.html";
  }
}

function falling() {
    boxes.push(new airBox(Math.random()*windowWidth, -100, 50, 50));
}

function mousePressed() {
  for (i = 0; i < boxes.length; i++)
  {
    //console.log(mouseX + " - " + mouseY);
    //console.log(boxes[i].body.position.x + " - " + boxes[i].body.position.y);
    let d = dist(mouseX, mouseY, boxes[i].body.position.x, boxes[i].body.position.y);
    //console.log(d);
    if (d < 30) {
      Matter.World.remove(world, boxes[i].body);
      boxes.splice(i,1);
      i--;
      score++;
      document.getElementById("score").innerHTML = score;
    }
  }
}

function draw() {
  background(50);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
    if(boxes[i].offScreen()) {
      Matter.World.remove(world, boxes[i].body);
      boxes.splice(i,1);
      i--;
      lives--;
      document.getElementById("Lives").innerHTML = lives;
    }

  }
}
