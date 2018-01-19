var game = {
    occupied: false, // vrai si traitement de la derniere action du joueur en cours
    grid: ["003020600", "900305001", "001806400", "008102900", "700000008", "006708200", "002609500", "800203009", "005010300"], // grille initiale
    curRow: 1,
    curCol: 1,
    buildBoard: function () { //affiche la grille
        var table = $("<table id='board'>").prependTo("main");
        let border = "2px solid black";
        for (var row = 1; row < 10; row++) {
          var tr = $("<tr>").appendTo(table);
          if (row%3 == 1) {
            tr.css("border-top",border);
          }
          if (row == 9) {
            tr.css("border-bottom",border);
          }
          for(var col = 1; col < 10; col++){
            var td = $("<td><div data-r='" + row + "' data-c='" + col + "'><span></div></td>").appendTo(tr);
            if (col%3 == 1) {
              td.css("border-left",border);
            }
            if (col == 9) {
              td.css("border-right",border);
            }
          }
        }
    },

    // Retourne la cellule (span) dont les coordonnees sont données.
    cellAt: function (row, col) {
        return $("[data-r='" + row + "'][data-c='" + col + "'] span");
    },

    // Retourne le chiffre dans la cellule dont les coordonnes sont données (0 si pas de valeur).
    getDigitAt: function (row, col) {
        var val = this.cellAt(row, col).text();
        return val == "" ? 0 : parseInt(val);
    },

    // Positionne le chiffre donné (potentiellement la chaine vide) dans la cellule dont les coordonnes sont donnes.
    // Le parametre fixed indique si le chiffre est initialement donnee dans la grille.
    setDigitAt: function (row, col, digit, fixed) {
        var cell = this.cellAt(row, col);
        if (fixed)
            cell.addClass("fixed");
        cell.text(digit);
    },
    hightlight: function () {
      $("[data-r]").css("background-color", "#f2f2f2");
      let c = $("[data-r='"+this.curRow+"'][data-c='"+this.curCol+"']");
      c.css("background-color","yellow");
    },
    initialize: function () {
        this.occupied = false;
        $("[data-r]").css("background-color", "#f2f2f2");
        $("[data-r] span").removeClass("fixed").empty();
        this.hightlight();
        for(let row=1; row<10; row++){
          for(let col=1; col<10; col++){
            var val = parseInt(this.grid[row - 1].charAt(col - 1));
            if (val != 0) {
                this.setDigitAt(row, col, val, true);
            }
          }
        }
    },

    possibleRowFor: function (row, digit) {
        for(var i=1; i<10; i++){
          let val = this.getDigitAt(row,i);
          if(val==digit){
            return false;
          }
        }
        return true;
    },

    possibleColFor: function (col, digit) {
        for(var i=1; i<10; i++){
          let val = this.getDigitAt(i, col);
          if (val == digit) {
            return false;
          }
        }
        return true;
    },

    possibleBlocFor: function (row, col, digit) {
      let dr = Math.floor((row - 1)/3)*3+1;
      let dc = Math.floor((col - 1)/3)*3+1;
      console.log(dr+" "+dc);
      for(let ir=0; ir<3; ir++){
        for(let ic=0; ic<3; ic++){
          let val = this.getDigitAt(dr+ir,dc+ic);
          if (val == digit) {
            return false;
          }
        }
      }
      return true;
    },

    playAt: function (row, col, digit2) {
        if (this.occupied)
            return;
        this.occupied = true;
        if (digit2 == undefined) {
          digit = parseInt($("#digits button.active").text());
        }
        else {
          digit = digit2;
        }
        if (this.getDigitAt(row, col) == 0) {
            if (this.possibleColFor(col, digit) && this.possibleRowFor(row, digit) && this.possibleBlocFor(row, col, digit)) {
              this.setDigitAt(row, col, digit, false);
              $(".comment").html("A vous de jouer.");
              let c = $("[data-r='"+this.curRow+"'][data-c='"+this.curCol+"']");
              c.css("background-color","yellow");
            }
            else {
              let message = "vous ne pouvez pas jouer ça ici";
              $(".comment").html(message);
              let c = $("[data-r='"+this.curRow+"'][data-c='"+this.curCol+"']");
              c.css("background-color","red");
            }
        } else {
          let c = this.cellAt(row, col);
          if (c.hasClass("fixed") == false) {
            c.empty();
          }
        }
        this.occupied = false;
    }
}

function message(s) {
    $("#error").text(s).animate({
        opacity: 1
    }, 200, function () {
        $(this).animate({
            opacity: 0
        }, 800);
    });
}


$(document).ready(function () {
    game.buildBoard();
    game.initialize();

    $("#restart").on("click", function(){

      game.initialize();

    });

    $("body").keydown(function(e){
      if (e.keyCode == 39 && game.curCol<9) {
        game.curCol++;
        game.hightlight();
      }
      if (e.keyCode == 37 && game.curCol>1) {
        game.curCol--;
        game.hightlight();
      }
      if (e.keyCode == 38 && game.curRow>1) {
        game.curRow--;
        game.hightlight();
      }
      if (e.keyCode == 40 && game.curRow<9) {
        game.curRow++;
        game.hightlight();
      }
      if (e.keyCode >48 && e.keyCode <=57) {
        game.playAt(game.curRow, game.curCol, e.keyCode-48);
      }
    });

    $("#load").on("click", function () {
        var g = $("textarea").first().val().split(/\s+/g);
        if (g.length == 9) {
            game.grid = g;
            game.initialize();
        }
    });

    $("#digits div button").on("click", function () {
        $("#digits button.active").removeClass("active");
        $(this).addClass("active");
    });

    $("[data-r]").on("click", function () {
        game.playAt($(this).attr("data-r"), $(this).attr("data-c"));
    });
})
