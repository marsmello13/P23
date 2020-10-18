var helicopterIMG, helicopterSprite, packageSprite,packageIMG;
var packageBody,ground,leftBox,bottomBox,rightBox,boxPosx,boxPosy;
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

function preload()
{
helicopterIMG=loadImage("helicopter.png");
packageIMG=loadImage("package.png");
}

function setup() {
createCanvas(800, 700);
rectMode(CENTER);


packageSprite=createSprite(width/2, 200, 10,10);
packageSprite.addImage(packageIMG);
packageSprite.scale=0.2;

helicopterSprite=createSprite(width/2, 200, 10,10);
helicopterSprite.addImage(helicopterIMG);
helicopterSprite.scale=0.6;

groundSprite=createSprite(width/2, height-35, width,10);
groundSprite.shapeColor=color(255);
//groundSprite.shapeColor="white";

engine = Engine.create();
world = engine.world;

packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:0.4, isStatic:true});//isStatic:true will make the packet stationary
//packageBody = Bodies.circle(width/2 , 200 , 5 , {restitution:1, isStatic:false});
//isStaatic:false will make the packet fall and bounce because of restitution
World.add(world, packageBody);

//Create a Ground
ground = Bodies.rectangle(width/2, 650, width, 10 , {isStatic:true} );
World.add(world, ground);

boxPosx=width/2;
boxPosy=660;//ground.y=700-35=665 is its centre. So, top =665-its height/2=665-10/2=665-5=660

leftBox = Bodies.rectangle(boxPosx-100, boxPosy-50, 20, 100 , {isStatic:true} );
World.add(world, leftBox);

//create sprites to be drawn on the screen for these bodies instead of rect
leftBoxBoxSprite=createSprite(boxPosx-100, boxPosy-50, 20, 100);
leftBoxBoxSprite.shapeColor="red";

bottomBox = Bodies.rectangle(boxPosx, boxPosy-10, 200, 20 , {isStatic:true} );
World.add(world, bottomBox);

//create sprites to be drawn on the screen for these bodies instead of rect
bottomBoxSprite=createSprite(boxPosx, boxPosy-10, 200, 20);
bottomBoxSprite.shapeColor="red";

rightBox = Bodies.rectangle(boxPosx+100,  boxPosy-50, 20, 100 , {isStatic:true} );
World.add(world, rightBox);

//create sprites to be drawn on the screen for these bodies instead of rect
rightBoxSprite=createSprite(boxPosx+100,  boxPosy-50, 20, 100);
rightBoxSprite.shapeColor="red";

Engine.run(engine);
    //console.log(packageBody.position.y);
    //console.log(packageSprite.y);
}

function draw() {
  //rectMode(CENTER);
  background(0);
  packageSprite.x= packageBody.position.x;
  packageSprite.y= packageBody.position.y;  

  drawSprites();
}

function keyPressed() {

  if (keyCode === DOWN_ARROW) {

    //Make the package body fall only on pressing down_arrow.
Matter.Body.setStatic(packageBody,false);//static property of packagebody should be set as false so that it will not be static and it will fall down
//initially it should not fall down so isStatic:true in line 34
}else if (keyCode === LEFT_ARROW) {

helicopterSprite.x=helicopterSprite.x-20;    
translation={x:-20,y:0};
Matter.Body.translate(packageBody, translation);

} else if (keyCode === RIGHT_ARROW) {
helicopterSprite.x=helicopterSprite.x+20;
translation={x:20,y:0};
Matter.Body.translate(packageBody, translation);
}
}

