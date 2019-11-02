function Bucket (x, y, w, h) {
  var options = {
    isStatic: true,
    density: 0,
    collisionFilter: 0
  };
  this.body = Matter.Bodies.rectangle(x, y, w, h, options);
  this.body.label = "bucket";
  this.w = w;
  this.h = h;
  Matter.World.add(world, this.body);
}

Bucket.prototype.show = function() {
  fill (30);
  stroke (255);
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  rectMode(CENTER);
  rect(0, 0, this.w, this.h);
  pop();
}
