(function(){ //mon application est protégée. un peu comme une classe sans en être une.

  document.addEventListener("DOMContentLoaded", initGame); //equivalent à document.ready

  var stage; //scene du jeu.
  var hero;
  var ennemis;

  function initGame(){
    console.log("initGame");
    stage =  new createjs.Stage("mmigame"); //on crée une nouvelle scnee de jeu dans le canvas

  /*  var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0,0,50); //creer un forme rond.
    circle.x = 540;
    circle.y = 200;
    stage.addChild(circle); //ajoute l'assets
    //stage.update(); //reload la scene.

    createjs.Tween.get(circle).to(
      {x: 400, y: 500}, 1000, createjs.Ease.elasticOut
    ).to(
      {x: 100, y: 60, alpha:0.6}, 2000, createjs.Ease.sineOut
    );*/

    createjs.Ticker.setFPS(60); //creer un clock à 60FPS autoreload
    createjs.Ticker.addEventListener("tick",updateStage)

    hero = new SuperHero();
    hero.create();
    ennemis =  new Ennemis();
    ennemis.create();
  }

  function updateStage(){
    if (hero) {
      hero.update();
    }
    if (ennemis){
      ennemis.update();
    }

    stage.update();
  }

  function SuperHero() {
    //les champs
      var _prop;
      var _animation;
      var _portrait;
      var _vitesse = 5;
      var _sens = 1;
      var _gun;

      //////////////////////
    //method de l'objet.
      function _create() {
        if (!obj.container) {
          obj.container = new createjs.Container();
          _spriteSheet = new createjs.SpriteSheet(game_assets.spritesheets.hero);
          //recupere l'animation
          _animation = new createjs.Sprite(_spriteSheet, 'fly');
          //recupere l'animation "fly"

          //on ajoute la tete de CN
          _portrait = new createjs.Bitmap('assets/avatar.jpg');
          _portrait.x = 99;
          _portrait.y = 5;
          _portrait.rotation = 25;
          _portrait.scaleX = _portrait.scaleY = 0.56;

          obj.container.addChild(_animation);
          obj.container.addChild(_portrait);
          //add les assets au container.
          stage.addChild(obj.container);
          //add container à la scene;

          _gun = new LazerGun();
          stage.on("stagemousedown", _gun.shoot);
        }
      }

      function _update(){
        if (!obj.container)return;

        //pour faire naviger le super hero de haut en bas.
        obj.container.y += _vitesse * _sens;
        var height = obj.container.getBounds().height;
        if(obj.container.y >= stage.canvas.height - height){
          _sens = -1;
        }
        if (obj.container.y <= 0) {
          _sens = 1;
        }
        if (_gun) {
          _gun.update();
        }

      }

      //////////////////////
    //ce qu'on retourne.
      var obj = {
        create: _create, //forward les function.
        container : null, //le container graphique.
        update: _update,
      };
      return obj;
  }

  function LazerGun(){
    var _container;
    var _vitesse = 30;

    ///////////////////////////

    function _shoot(){
      if (!_container) {
        _container =  new createjs.Container();
        stage.addChild(_container);
      }

      var lazer = new createjs.Shape();
      lazer.graphics.beginFill("pink").drawRect(0, 0, 30, 8);
      lazer.setBounds(0,0,30,8);
      lazer.x = hero.container.x + 155;
      lazer.y = hero.container.y + 62;

      _container.addChild(lazer);
    }

    function _update(){
      if(!_container)return;
      var nblazers = _container.getNumChildren();
      for (var i = nblazers-1; i >= 0; i--) {
        var lazer = _container.getChildAt(i);
        lazer.x += _vitesse;
        if (lazer.x > stage.canvas.width) {
          _container.removeChildAt(i);
        }
      }
    }

    ///////////////////////////

    var obj = {
      shoot : _shoot,
      update : _update,
    };
    return obj;
  }

  function Ennemis(){
    var _container;
    var _animGuys, _animCat;
    var _chrono;
    var _positions = {
      min : stage.canvas.height - 300,
      max : stage.canvas.height - 40,
      hide : stage.canvas.height + 400
    }
    var _isHidden = false;
    ////////////////////

    function _create(){
      if (!_container) {
        _container = new createjs.Container();
        stage.addChild(_container);
        _container.x = stage.canvas.width - 170;
        _container.y = stage.canvas.height - 100;

        var podium = new createjs.Bitmap('assets/podium.png');
        _container.addChild(podium);

        var SpriteSheetGuys = new createjs.SpriteSheet(
          game_assets.spritesheets.ennemis
        );
        _animGuys = new createjs.Sprite(SpriteSheetGuys, 'guy0');
        _container.addChild(_animGuys);
        _animGuys.x = 65;
        _animGuys.y = 15;
        _animGuys.regX = 40;
        _animGuys.regY = 180;
        _animGuys.name = "guys";
        _animGuys.setBounds(0,0,80,180);

        var SpriteSheetCat = new createjs.SpriteSheet(
          game_assets.spritesheets.cat
        );
        _animCat = new createjs.Sprite(SpriteSheetCat, 'love');
        _container.addChild(_animCat);
        _animCat.x = 60;
        _animCat.y = 15;
        _animCat.regX = 65;
        _animCat.regY = 130;
        _animCat.name = "cat";
        _animCat.setBounds(0,0,36,130);

        _startChrono();
        _chooseEnnemie();
      }
    }

    function _startChrono(){
      _stopChrono();
      _chrono = setInterval(_onTickChrono, 1000);
    }
    function _stopChrono(){
      if (_chrono) {
        clearInterval(_chrono);
        _chrono = null;
      }
    }
    function _onTickChrono(){
      var pos = 0;
      if (_isHidden) {
        _chooseEnnemie();
        _isHidden = false;
        pos = getRandomRange(_positions.min, _positions.max);
      }else {
        _isHidden = true;
        pos = _positions.hide;
      }
      createjs.Tween.get(_container).to(
        {y : pos}, 500, createjs.Ease.quartOut
      );
    }

    function _chooseEnnemie(){
      var random = getRandomRange(0, 7);
      if (random > 3) {
        _animCat.visible = true;
        _animGuys.visible = false;
      }else {
        _animCat.visible = false;
        _animGuys.visible = true;
      }
    }

    function _update(){

    }

    ////////////////////

    var obj = {
      create: _create,
      update: _update,
    }
    return obj;
  }
})(); //"()" pour l'auto apeuler apres sa déclaration
