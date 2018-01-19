var game = {
    occupied: false, // vrai si traitement de la derniere action du joueur en cours
    grid: ["003020600", "900305001", "001806400", "008102900", "700000008", "006708200", "002609500", "800203009", "005010300"], // grille initiale

    buildBoard: function () {
        var table = $("<table id='board'>").prependTo("main");
        //for (var row = ? ? ? ) { // on veut aller de 1 à 9
        //  var tr = $("<tr>").appendTo(table);
        //  for (var col = ? ? ? ) { // on veut aller de 1 à 9
        //    var td = $("<td><div data-r='" + row + "' data-c='" + col + "'><span></div></td>");
        //    var borderStyle = "2px black solid";
        //    // deuxième temps : glisser ici le code pour placer les bordures !!
        //    // ???
        //    tr.append(td);
        //  }
        //}
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

    initialize: function () {
        this.occupied = false;
        $("[data-r]").css("background-color", "#f2f2f2");
        $("[data-r] span").removeClass("fixed").empty();
        // !! completer le code ci-dessous pour charger la grille !! 
        // for (var row ? ? ? ) // iteration sur les indices de ligne
        //    for (var col ? ? ? ) { //iteration sur les indices de colonne
        //      var val = parseInt(this.grid[row - 1].charAt(col - 1));
        //      // appeler setDigitAt si val n'est pas 0
        //    }
    },

    possibleRowFor: function (row, digit) {
        //!! glisser le code ici pour tester si digit est deja present sur la ligne 
        return true;
    },

    possibleColFor: function (col, digit) {
        //!! glisser le code ici pour tester si digit est deja present sur la colonne
        return true;
    },

    possibleBlocFor: function (row, col, digit) {
        //!! glisser le code ici pour tester si digit est deja present dans le bloc
        return true;
    },

    playAt: function (row, col) {
        if (this.occupied)
            return;
        this.occupied = true;
        if (this.getDigitAt(row, col) == 0) {
            var digit = parseInt($("#digits button.active").text());
            // !! Glisser ici le code pour tester si le coup est valide, cad si le digit n'est pas déja présent sur la ligne ou la colonne (et le bloc) 
            // !! si le coup est valide, alors on appelle setDigitAt, sinon on appelle la fonction message
        } else {
            // !! partie else (il y a déjà un chiffre dans la case) : on aimerait l'effacer (à condition que ce ne soit pas un chiffre de la grille intitiale) 
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

    // On souhaire reinitialiser le jeu chaque fois que l'utilisateur clique sur le bouton restart
    // Ajouter le code ici

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