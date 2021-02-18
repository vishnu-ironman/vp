var dog,sadDog,happyDog;
var foodObj;
var foodS,foodStock;
var feedTime,lastFed,feed,addFood;
var input;
var groun;
var  groun2
function preload(){
  sadDog=loadImage("Dog.png");
  happyDog=loadImage("happy dog.png");
  f = loadImage("f.jpg")
}

function setup() {

  database = firebase.database()
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  groun = createSprite (500,330,1000,20);
  
  groun.shapeColor = "red";
  groun.visible = false;


  groun2 = createSprite (1000,330,20,500); 
  groun2.shapeColor = "red";
  groun2.visible = false;
  

  feed = createButton("feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood = createButton("add food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

   input = createInput("Name");
  input.position(980,95);

  

  var button = createButton("enter");
  button.position(980,135);
  button.mousePressed(enter);


   var button1 = createButton("make your dog jump");
   button1.position(980,400);
   button1.mousePressed(enter1)


   var button2 = createButton("make your dog move forward")
button2.position(700,400)
button2.mousePressed(enter3);

}

function draw() {
  background(f);


  
   foodObj.display();

   dog.velocityY = dog.velocityY + 0.8;
   dog.velocityX = dog.velocityX + 0.8;

   feedTime = database.ref('FeedTime')
   feedTime.on("value",function(data){
     lastFed = data.val();
   })

   fill("cyan");
   textSize(15);

   if(lastFed >= 12){
     text("Last Fed:" + lastFed%12 +"pm",350,30);
   }else if (lastFed === 0){
     text("Last Fed: 12 Am",350,30);
   }else{
     text("Last Fed:"+ lastFed + "am",350,30);
   }
  fill("black");
  textSize(20)
  stroke("red")
   text("Dog Name",680,35)

  dog.collide(groun)
  dog.collide(groun2)
  drawSprites();
}

function readStock(data){
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);
dog.x =400;
dog.y = 150;

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref("/").update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()

    

  })
}

function addFoods(){
  foodS++;
  database.ref("/").update({
    Food:foodS
  })
}


function enter(){

 var  name = input.value();
  input.hide();

  var greeting = createElement("h3");
  greeting.html( name);
  greeting.position(980,95)
}

function enter1(){
  dog.velocityY = -15;
}


function enter3(){
  dog.velocityX = -19;
}