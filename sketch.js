const {
    Engine, 
    World, 
    Bodies, 
    MouseConstraint, 
    Constraint,
    Mouse,
    Events
  } = Matter
  
  let ground;
  let box;
  let ball;
  let world,engine;
  let mConstraint;
  let slingshot;
  let points = 0;
  let highScore = 0; 
  let ballImg;
  let basketImg;
  let stance;
  let jump;
  let level = 0
  let pass = [5,20,50,100]
  let count = 1000;
  let scoreCount = 0;
  
  function preload(){
    ballImg = loadImage('ball.png')
    stance = loadImage('stance.png')
    jump = loadImage('jump.png')
    release = loadImage('release.png')
    basketImg = loadImage('basket.png')
    bgImg = loadImage('2.jpg')
    bball = loadSound('bball.mp3')
    gameOver = loadSound('gameOver.mp3')
    bucket = loadSound('point.mp3')
    intro = loadSound('gd.mp3')
    stage2 = loadSound('ow.mp3')
    stage3 = loadSound('lm.mp3')
    stage4 = loadSound('ts.mp3')
  }
 
 
  function setup() {
    intro.play()
    const canvas = createCanvas(600, 400);
    engine = Engine.create();
    engine.world.gravity.y = 1.8;
    world = engine.world;
    function collision(event){
      let pairs = event.pairs;
      for (var i=0; i<pairs.length; i++) {
        var bodyA = pairs[i].bodyA;
        var bodyB = pairs[i].bodyB;
        if (bodyB.label || bodyA.label == "ball") {
        bball.play()
        }
      }
    }


    Events.on(engine, 'collisionStart', collision);


    ground = new Ground(width/2, height, width, 50);
    backBoard = new Box(550, 60, 1, 99); 
    ball = new Ball(150, 200, 20);
    frontRing = new Ring(480, 110, 1 , 1)
    backRing = new Ring(540, 110, 10 , 1)
    slingshot = new Slingshot(150,220, ball.body);
    const mouse = Mouse.create(canvas.elt)
    const options = {
      mouse: mouse
    }
    mConstraint = MouseConstraint.create(engine, options)
    World.add(world,mConstraint)
  }
  function score(){
    let b = ball.body.position
    if((b.x >480 && b.x <550)&&(b.y >110 && b.y <120)){
        points ++; 
        scoreCount ++;
        bucket.play();
        count +=100
        setTimeout(()=>{
          scoreCount = 0;
        },1500)
    }
  }
  
  function countDown() {
    count --;
  }

  function mouseReleased(){
    if (count > 0 && points > pass[level]){
      intro.stop()
      stage2.play()
      level = 1;
      count = 1500
    }
    if (count > 0 && points > pass[level]){
      stage2.stop()
      stage3.play()
      level = 2
      count = 2500
    }
    if (count > 0 && points > pass[level]){
      stage3.stop()
      stage4.play()
      level = 3
      count = 3000
    }
    if (count > 0 && points > pass[level]){
      stage4.stop()
      intro.play()
      level = 887
      count = 40000
    }
    if (count >  0) {
    setTimeout(()=>{
    slingshot.fly()
    }, 20)
    setTimeout(()=>{
      slingshot.attach(ball.body)
    }, 3000)
  } else {
    if (points > highScore){
      highScore = points;
    }
    points = 'Game Over!'
    gameOver.play()
    setTimeout(()=>{
      points = 0;
      count = 1000;
      level = 0;
      }, 3500)
  }
  }
  function render(){
   if(ball.body.velocity.x>5){
    image(release, 80, 130 + ball.body.velocity.y * 3, 70, 150)
   } else if (ball.body){
    image(stance, 80, 190, 70, 150)
   }
  }
  function draw() {
    countDown();
    score();
    Engine.update(engine);
    slingshot.show()
    ground.show();
    image(bgImg, 0, 0, 600, 400)
    ball.show();
    backBoard.show();
    frontRing.show()
    backRing.show()
    fill(0,255,255);
    if(count > 0 ){
      rect(4,380,count/10,20);
      text((pass[level]- points + 1),170,40)
      text('Points left : ', 5, 40)
      text(level + 1,120,370)
      text('Level : ',4,370)
    }
    if(points === "Game Over!"){
    text('High Score : ', 260, 370);
    text(highScore, 500, 370);
    }
    if(count === 0){
    points = 'Game Over!'
    gameOver.play()
    intro.stop()
    setTimeout(()=>{
      points = 0;
      count = 1000;
      level = 0;
      intro.play();
      }, 3500)
    }
    textSize(32);
    image(basketImg, 435, -50, 170, 450)
    if (scoreCount>0 && count%3===0){
    text(scoreCount, 500, 70);
    }
    render();
    fill(0,255,0);
    fill(0);
  }