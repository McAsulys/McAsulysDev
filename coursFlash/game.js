(function(){ //mon application est protégée. un peu comme une classe sans en être une.

  document.addEventListener("DOMContentLoaded", initGame); //equivalent à document.ready

  var stage; //scene du jeu.
  var hero;
  var ennemis;
  var score;

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

    /*hero = new SuperHero();
    hero.create();
    ennemis =  new Ennemis();
    ennemis.create();
    score = new Score();
    score.create(); */
    homeScreen = new HomeScreen();
    homeScreen.create();
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
      if (ennemis.canTouched == false)return;
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
        }else {
          var isTouched = checkCollision(lazer, ennemis.currentEnnemi);
          if(isTouched){
            _container.removeChildAt(i);
            ennemis.die();
          }
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

        obj.currentEnnemi = _animCat;
      }else {
        _animCat.visible = false;
        _animGuys.visible = true;
        _animGuys.gotoAndStop(random);
        obj.currentEnnemi = _animGuys;
      }
    }

    function _die(){
      obj.currentEnnemi.scaleX = obj.currentEnnemi.scaleY = 1;
      obj.canTouched = false;
      createjs.Tween.get(obj.currentEnnemi)
        .to({scaleX : 1.5, scaleY : 1.5}, 300, createjs.Ease.quartOut)
        .to({scaleX : 1, scaleY : 1}, 800, createjs.Ease.elasticOut)
        .call( function(){
          obj.canTouched = true;
        });

      if (obj.currentEnnemi.name == "cat") {
        console.log("CHAT !");
        score.update(-10);
      }else {
        console.log("GUY !");
        score.update(10);
      }
    }

    function _update(){

    }

    ////////////////////

    var obj = {
      create: _create,
      update: _update,
      currentEnnemi : null,
      die: _die,
      canTouched : true,
    }
    return obj;
  }

  function Score(){
    var _text;
    var _score = 0;

    function _create(){
      //creation du champ texte
      _text = new createjs.Text(
        "Score : 0", //texte
        "30px bowlby_oneregular", //font-size font-family
        "#ff7700", //color
      );
      _text.x = stage.canvas.width /2;
      _text.y = 20;
      _text.textAlign = "center";
      stage.addChild(_text);
    }
    function _update(points){
      //maj du score
      _score += points;
      _text.text = "Score : " + _score;
    }

    var obj = {
      create: _create,
      update: _update,
    };
    return obj;
  }

  function HomeScreen(){
    var _container;
    var _btnStart;

    function _create(){
      _container =  new createjs.Container();
      _container.x = stage.canvas.width /2;
      _container.y = stage.canvas.height /2;
      stage.addChild(_container);

      var text1, text2, animation1, animation2;
      text1 = new createjs.Text("Mmi Game", "50px bowlby_oneregular", '#ff5382');
      text1.textAlign = "center";
      text1.y = -70;
      _container.addChild(text1);

      text2 = new createjs.Text("Tape tes amis et bute pas le chat !", "20px bowlby_oneregular", "#ff5382");
      text2.textAlign = "center";
      _container.addChild(text2);
      //hero
      var spriteSheet = new createjs.SpriteSheet(game_assets.spritesheets.hero);
      animation1 = new createjs.Sprite(spriteSheet, 'fly');
      _container.addChild(animation1);
      animation1.x = -200;
      animation1.y = -200;

      //CHAT
      var spriteSheet = new createjs.SpriteSheet(game_assets.spritesheets.cat);
      animation2 = new createjs.Sprite(spriteSheet, "love");
      _container.addChild(animation2);
      animation2.x = 50;
      animation2.y = -200;

      //_btnStart
      _btnStart = new createjs.Container();
      _btnStart.y = 120;
      _btnStart.mouseChildren = false; //crerr le bouton en un block
      _container.addChild(_btnStart);
      var bg = new createjs.Shape();
      bg.graphics.beginFill("#6a7bff").drawRoundRect(-70, -30, 140, 60, 10);
      var label = new createjs.Text("START", "20px bowlby_oneregular", "#bbbffe")
      label.textAlign = "center";
      label.textBaseline = "middle";
      _btnStart.addChild(bg, label);
      _btnStart.addEventListener('click', _onClickStart);

      //animation d'entrée
      createjs.Tween.get(text1)
        .to({y : 800},0)
        .wait(300)
        .to({y : -70}, 1000, createjs.Ease.quartOut);

        createjs.Tween.get(text2)
          .to({y : 800},0)
          .wait(500)
          .to({y : 0}, 1000, createjs.Ease.quartOut);

        createjs.Tween.get(animation1)
          .to({x : -800},0)
          .wait(1000)
          .to({x : -200}, 1000, createjs.Ease.quartOut);

          createjs.Tween.get(animation2)
            .to({x : 800},0)
            .wait(600)
            .to({x : 50}, 1000, createjs.Ease.quartOut);

            createjs.Tween.get(_btnStart)
              .to({y : 800},0)
              .wait(500)
              .to({y : 120}, 1000, createjs.Ease.quartOut);
    }
    function _onClickStart(){
      console.log("clique");

      hero = new SuperHero();
      hero.create();
      ennemis =  new Ennemis();
      ennemis.create();
      score = new Score();
      score.create();

      if (_container) {
        stage.removeChild(_container);
        _btnStart.removeAllEventListeners();
        _container = _btnStart = null;
      }
    }

    var obj = {
      create : _create,
    };
    return obj;
  }
})(); //"()" pour l'auto apeuler apres sa déclaration
