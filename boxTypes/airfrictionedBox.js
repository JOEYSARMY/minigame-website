function airBox(x, y, w, h) {
  this.body = Matter.Bodies.rectangle(x, y, w, h);
  this.body.frictionAir = .15;
  this.hue = random(360);
  this.w = w;
  this.h = h;
  Matter.World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    fill(this.hue, 255, 255);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
  this.offScreen = function() {
    var x = this.body.position.x;
    var y = this.body.position.y;
    return (y > windowHeight);
  }

}
