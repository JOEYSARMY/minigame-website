function airCircle(x, y, r) {
  this.body = Matter.Bodies.circle(x, y, r);
  this.r = r;
  this.body.frictionAir = .05;
  Matter.World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0, this.r * 2);
    pop();
  }

  this.offScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (y > windowHeight);
  }
}
