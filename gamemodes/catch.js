var engine;
var world;
var boxes = [];
var score = 0;

function setup() {
  createCanvas(400, 400);
  engine = Matter.Engine.create();
  world = engine.world;
  Matter.Engine.run(engine);
  setInterval(falling,500);


}



function falling() {
    boxes.push(new airBox(Math.random()*400, -100, 50, 50));
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
      console.log(score);
    }
  }
}

function draw() {
  background(50);
  for (var i = 0; i < boxes.length; i++) {
    Matter.World.add(world, boxes[i]);
    boxes[i].show();

  }
}
