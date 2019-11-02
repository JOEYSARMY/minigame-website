var engine;
var world;
var boxes = [];

function setup() {
  createCanvas(400, 400);
  engine = Matter.Engine.create();
  world = engine.world;
  Matter.Engine.run(engine);
  var options = {
    isStatic: true
  }
  ground = Matter.Bodies.rectangle(200, height, width, 10, options);
  Matter.World.add(world, ground);
}

function mouseDragged() {
  boxes.push(new Box(mouseX, mouseY, 50, 50));
}

function draw() {
  background(50);
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
}
