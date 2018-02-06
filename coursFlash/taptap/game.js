(function(){
  document.addEventListener("DOMContentLoaded", initGame);

  var stage, hammer, ponies;

  function initGame(){
    console.log("initGame");
    stage = new createjs.Stage("game");

    createjs.Ticker.setFPS(60);
    createjs.Ticker.addEventListener("tick", updateStage);
    homeScreen = new HomeScreen();
  }

  class HomeScreen {
    constructor() {
      var container;
      var startButton;

      container = new createjs.Container();

      //met le menue au centre du canvas
      container.x = stage.canvas.width /2;
      container.y = stage.canvas.height /2;

      stage.addChild(container);

      var titre, btnStart, motto;

      titre = new createjs.Text("Tape Ponies", "70px Arial", "#ff5382");
      titre.textAlign="center";
      titre.y = -100
      container.addChild(titre);

      motto = new createjs.Text("Smash ponies, but take care of Spike", "20px Arial", "#ff5382");
      motto.textAlign="center";
      container.addChild(motto);

      btnStart = new createjs.Container();
      btnStart.y = 120;
      btnStart.mouseChildren = false; //crerr le bouton en un block
      container.addChild(btnStart);
      var bg = new createjs.Shape();
      bg.graphics.beginFill("#6a7bff").drawRoundRect(-70, -30, 140, 60, 10);
      var label = new createjs.Text("START", "20px Arial", "#bbbffe")
      label.textAlign = "center";
      label.textBaseline = "middle";
      btnStart.addChild(bg, label);
      btnStart.addEventListener('click', onClickStart);
    };
  }

  class Hero {
    constructor() {

    }
    tap(){ //lorsque le joueur clique

    }
  }
  class Ponies {
    constructor() {

    }

    touch(){ //lorsque l'ennemie est touché

    }
  }

  function updateStage(){
    //if (hero)
      //hero.update();
    //if (ponies)
      //ponies.update();
    stage.update();
  }
})();
