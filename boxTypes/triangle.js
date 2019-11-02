function airtriangle(x, y, r) {
  this.body = Matter.Bodies.polygon(x, y, 3, r);
  this.r = r;
  this.body.frictionAir = .05;
  Matter.World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    triangle(0,3,3);
    pop();
  }

  this.offScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (y > windowHeight);
  }
}
