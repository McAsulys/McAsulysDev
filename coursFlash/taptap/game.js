(function(){
  document.addEventListener("DOMContentLoaded", initGame);

  var stage, hammer, ponies, score;

  function initGame(){
    console.log("initGame");
    stage = new createjs.Stage("game");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", updateStage);
    homeScreen = new HomeScreen();
  }

  class HomeScreen {

    constructor() {

      this.container = new createjs.Container();

      //met le menue au centre du canvas
      this.container.x = stage.canvas.width /2;
      this.container.y = stage.canvas.height /2;

      stage.addChild(this.container);

      var titre, motto;

      titre = new createjs.Text("Tape Ponies", "70px Arial", "#ff5382");
      titre.textAlign="center";
      titre.y = -100
      this.container.addChild(titre);

      motto = new createjs.Text("Smash ponies, but take care of Spike", "20px Arial", "#ff5382");
      motto.textAlign="center";
      this.container.addChild(motto);

      this.btnStart = new createjs.Container();
      this.btnStart.y = 120;
      this.btnStart.mouseChildren = false; //crerr le bouton en un block
      this.container.addChild(this.btnStart);
      var bg = new createjs.Shape();
      bg.graphics.beginFill("#6a7bff").drawRoundRect(-70, -30, 140, 60, 10);
      var label = new createjs.Text("START", "20px Arial", "#bbbffe")
      label.textAlign = "center";
      label.textBaseline = "middle";
      this.btnStart.addChild(bg, label);

      //luncher cheloue, mais qui fonctionne
      var that = this;
      this.btnStart.addEventListener('click', function(){
        that.start();
      });

    }
    start(){
      console.log("start", this);
      hammer = new Hammer();
      ponies = new Ponies();
      score = new Score();
      if(this.container){
        stage.removeChild(this.container);
        this.btnStart.removeAllEventListeners();
        this.container = this.btnStart = null;
      }
    }
  }

  class Hammer {
    constructor() {
      this.container = new createjs.Container();
      hammer = new createjs.Bitmap("assets/hammer.png");
      hammer.scaleX = -0.6;
      hammer.scaleY = 0.6;
      hammer.x= 650;
      hammer.y= 400;
      hammer.regX = 60;
      hammer.regY = 500;
      hammer.rotation = 0;

      var that = this;
      stage.on("stagemousedown", function(){
        that.tap();
      });

      this.container.addChild(hammer);
      stage.addChild(this.container);

      this.hammer = hammer;
    }
    tap(){ //lorsque le joueur clique
      console.log("tap");
      createjs.Tween.get(this.hammer).to({rotation : -55},200).to({rotation: 0}, 600);
    }
    update(){

    }
  }
  class Ponies {
    constructor() {
      this.container = new createjs.Container();
      stage.addChildAt(this.container,0);
      var rnd = getRandomRange(1, 6);

      var pony1 = new createjs.Bitmap("assets/apple.png");
      pony1.visible = false;
      pony1.scaleX = pony1.scaleY = 0.6;
      pony1.x = 300;
      pony1.y = 300;

      var pony2 = new createjs.Bitmap("assets/pinkie.png");
      pony2.visible = false;
      pony2.scaleX = pony2.scaleY = 0.5;
      pony2.x = 320;
      pony2.y = 300;

      var pony3 = new createjs.Bitmap("assets/rainbow.png");
      pony3.visible = false;
      pony3.scaleX = pony3.scaleY = 0.6;
      pony3.x = 250;
      pony3.y = 300;

      var spike = new createjs.Bitmap("assets/spike.png");
      spike.visible = false;
      spike.scaleX = spike.scaleY = 0.6;
      spike.x = 300;
      spike.y = 300;

      var pony4 = new createjs.Bitmap("assets/tampest.png");
      pony4.visible = false;
      pony4.scaleX = pony4.scaleY = 0.7;
      pony4.x = 320;
      pony4.y = 300;

      var pony5 = new createjs.Bitmap("assets/twilight.png");
      pony5.visible = true;
      pony5.scaleX = pony5.scaleY = 0.6;
      pony5.x = 250;
      pony5.y = 300;




    this.container.addChild(pony1);
    this.container.addChild(pony3);
    this.container.addChild(pony2);
    this.container.addChild(pony4);
    this.container.addChild(pony5);
    this.container.addChild(spike);
    }

    touch(){ //lorsque l'ennemie est touché

    }
  }
  class Score {
    constructor() {

    }
  }

  function updateStage(){
    //if (hammer)
      //hammer.update();
    //if (ponies)
      //ponies.update();
    stage.update();
  }
})();
