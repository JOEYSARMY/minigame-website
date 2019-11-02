function Plinko (x, y, r) {
  var options = {
    restitution: 0.5,
    isStatic: true,
    friction: 0
  }
  this.body = Matter.Bodies.circle(x, y, r, options);
  this.r = r;
  Matter.World.add(world, this.body);
}

Plinko.prototype.show = function() {
  fill (255);
  noStroke();
  var pos = this.body.position;
  push();
  translate(pos.x, pos.y);
  ellipse(0, 0, this.r * 2);
  pop();
}
