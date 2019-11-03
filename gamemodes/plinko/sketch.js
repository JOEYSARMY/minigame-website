var engine;
var world;
var buckets = [];
var bounds = [];
var particles = [];
var plinkos = [];
var cols = 11;
var rows = 10;
var score = -1;
var ballsLeft = 10;
var hasRun = false;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function setup() {
  createCanvas(700, 800);
  colorMode(HSB);
  engine = Matter.Engine.create();
  world = engine.world;
  world.gravity.y = 2;
  var spacing = width / cols;
  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols + 1; i++) {
      var x = i * spacing;
      if (j % 2 == 0) {
        x += spacing / 2;
      }
      var y = spacing + j * spacing;
      var p = new Plinko(x, y, 16);
      plinkos.push(p);
    }
  }
  setInterval(checkBalls, 1);
  var b = new Boundary(width/2, height + 50, width, 100);
  bounds.push(b);

  for (var i = 0; i < cols + 2; i++) {
    var x = i * spacing - 10;
    var h = 100;
    var w = 10;
    var y = height - h / 2;
    var b = new Boundary(x, y, w, h);
    bounds.push(b);
  }

  var bucket = new Bucket(width/2, height + 50, width, 100);
  buckets.push(bucket);

  for (var i = 0; i < cols + 2; i++) {
    var x = (i * spacing - 10) + 32;
    var h = 100;
    var w = 50;
    var y = height - h / 2;
    var bucket = new Bucket(x, y, w, h);
    buckets.push(bucket);
  }
}

function mousePressed() {
  if (mouseY > 30) {
    return;
  }
  if (ballsLeft > 0) {
    particles.push(new Particle(mouseX, mouseY, 10));
    ballsLeft--;
    document.getElementById("ballsleft").innerHTML = ballsLeft;
  } else {
    return;
  }
}

async function checkBalls() {
  if (ballsLeft == 0) {
    await sleep(6000);
    gameOver();
  }
}

function gameOver() {
  window.location.href = "gameOver.html";
}

function draw() {
  background (0, 0, 0);
  Matter.Engine.update(engine);

  particles.forEach(function(part) {
    for (var i = 0; i < buckets.length; i++) {
      var collision = Matter.SAT.collides(buckets[i].body, part.body);
      if (collision.collided) {
        Matter.World.remove(world, buckets[i].body);
        buckets.splice(i, 1);
        i--;
        score++;
        document.getElementById("score").innerHTML = score;
      }
    }
  });
  for (var i = 0; i < particles.length; i++) {
    particles[i].show();
    if (particles[i].isOffScreen()) {
      Matter.World.remove(world, particles[i].body);
      particles.splice(i, 1);
      i--;
    }
  }
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].show();
  }
  for (var i = 0; i < buckets.length; i++) {
    buckets[i].show();
  }
  for (var i = 0; i < bounds.length; i++) {
    bounds[i].show();
  }
}
