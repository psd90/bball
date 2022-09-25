class Ball {
    constructor(x, y, r){
      const options = {
        restitution: 0.8,
        friction: 20
      }
      this.body = Bodies.circle(x,y,r, options)
      this.body.label = "ball"
      Matter.Body.setMass(this.body, this.body.mass*0.01)
      World.add(world, this.body)
      this.r = r;
    }
    show(){
      const pos = this.body.position;
      const angle = this.body.angle;
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      image(ballImg,-14 ,-14, 30, 30)
      imageMode(CENTER);
      pop()
    }
  }