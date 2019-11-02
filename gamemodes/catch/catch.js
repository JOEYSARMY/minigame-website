var engine;
var world;
var boxes = [];
var circles = [];
var trapezoids = [];
var score = 0;
var lives = 5;

function setup() {
  createCanvas(windowWidth, windowHeight,);
  engine = Matter.Engine.create();
  world = engine.world;
  Matter.Engine.run(engine);
  setInterval(fallingboxes,500);
  setInterval(fallingcircles, 10000);
  setInterval(gameOver, 1);


}

function gameOver(){
  if(lives <= 0) {
    window.location.href = "gameOver.html";
  }
}

function fallingboxes() {
    boxes.push(new airBox(Math.random()*windowWidth, -100, 50, 50));
}

function fallingcircles() {
  circles.push(new airCircle(Math.random() * windowWidth, -100, 40));
}

function mousePressed() {
  deletus(boxes);
  deletus(circles);
}

function deletus (arr) {
  for (i = 0; i < arr.length; i++) {
    let d = dist(mouseX, mouseY, arr[i].body.position.x, arr[i].body.position.y);
      if (d < 30) {
        Matter.World.remove(world, arr[i].body);
        arr.splice(i,1);
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


    for (var i = 0; i < circles.length; i++) {
      circles[i].show();
      if(circles[i].offScreen()) {
        Matter.World.remove(world, circles[i].body);
        circles.splice(i,1);
        i--;
        lives--;
        document.getElementById("Lives").innerHTML = lives;
        }
      }
}
