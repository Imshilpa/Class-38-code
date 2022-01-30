class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }
//to make the car move
  handlePlayerControls(){
    if(keyIsDown(UP_ARROW)){
      player.positionY +=10;
      player.update();
    }
  }


  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();
    this.handlePlayerControls();

    Player.getPlayersInfo();

    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6);

      //to give x and y position to the player
      var index=0;
      for(var plr in allPlayers){
       index = index +1;
       var x = allPlayers[plr].positionX;
       var y = height-allPlayers[plr].positionY

       cars[index-1].position.x = x;
       cars[index-1].position.y = y;

      //marking the player car
       if(index == player.index){
         stroke("black")
         fill("white")
         ellipse(x,y,60,60);

         //giving the game camera effect
         camera.position.x = cars[index-1].position.x;
         camera.position.y= cars[index-1].position.y;
       }
      }

      drawSprites();
    }
  }
}
