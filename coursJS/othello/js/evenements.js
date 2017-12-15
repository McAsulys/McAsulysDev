var VIDE = 0;
var NOIR = 1;
var BLANC = 2;


var NORMAL = -1;
var FINI = 0;
var NOIRNEPEUTPASJOUER = -2;
var BLANCNEPEUTPASJOUER = -3;

function joueEnPosition() {
    var lig = parseInt($(this).parent().attr("data_l"));
    var col = parseInt($(this).parent().attr("data_c"));
    if (game.echiquier[lig][col] != VIDE || game.enCours == true)
        return;
    game.joue(lig, col);
}

var game = {
    divs: [], // Les divs dans lesquelles on met les images
    echiquier: [], // Pour l'algo
    aQuiLeTour: BLANC, // Les blancs commencent
    enCours: false, // vrai si un joueur vient de cliquer, 


    /*
     ********************************************************************************
     * Crée le damier (table HTML) et initialise les divers champs
     ********************************************************************************
     */
    creeEchiquier: function () {
        var table = $("<table class='echiquier'>");
        $('#game').prepend(table);
        for (var lig = 1; lig <= 8; lig++) {
            this.divs[lig] = [];
            this.echiquier[lig] = [];
            var tr = $('<tr>').appendTo(table);
            for (var col = 1; col <= 8; col++) {
                var d = $("<div class='content'>");
                $("<td data_l='" + lig + "' data_c='" + col + "'></td>").append(d).appendTo(tr);;
                this.divs[lig][col] = d;
                d.on("click", joueEnPosition);
            }
        }
    },

    /**
     ********************************************************************************
     * (Re)Initialise le jeu (possibilité de redémarrer)
     ********************************************************************************
     */
    initialiseJeu: function () {
        this.aQuiLeTour = BLANC; // Les blancs commencent
        this.enCours = false; // Personne ne joue
        $('.echiquier tr td div.content').html("");
        for (var lig = 1; lig <= 8; lig++)
            for (var col = 1; col <= 8; col++)
                this.echiquier[lig][col] = VIDE;

        // Remet la couleur de fond sur l'echiquier (utile si appuie sur aide)
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                this.divs[i][j].css("background-color", "lightgrey");

        this.ajoutePion(4, 4, BLANC);
        this.ajoutePion(5, 5, BLANC);
        this.ajoutePion(4, 5, NOIR);
        this.ajoutePion(5, 4, NOIR);
        $("#scoreNoirs").html(2);
        $("#scoreBlancs").html(2);
        $("#info").css("opacity", 0);
        $("#joueurEnCours").html("White plays");

    },

    /**
     ********************************************************************************
     * Ajoute un pion sur l'echiquier
     ********************************************************************************
     */
    ajoutePion: function (lig, col, color) {
        this.echiquier[lig][col] = color;
        if (color == NOIR) c = "noir";
        else c = "blanc";
        $("<img class='pion' src='imgs/" + c + ".png' />").appendTo(this.divs[lig][col]).hide().fadeIn(1000);
    },

    /**
     ********************************************************************************
     * Inverse la couleur du pion
     ********************************************************************************
     */

    inversePion: function (lig, col) {
        console.log("Inverse" + lig + " " + col);
        /*this.divs[lig][col].children(":first").fadeOut("slow", function () {
             $(this).remove();
             if (game.echiquier[lig][col] == BLANC)
                 game.ajoutePion(lig, col, NOIR);
             else
                 game.ajoutePion(lig, col, BLANC);
         });*/

        this.divs[lig][col].children(":first").remove();
        if (game.echiquier[lig][col] == BLANC)
            game.ajoutePion(lig, col, NOIR);
        else
            game.ajoutePion(lig, col, BLANC);
    },


    /**
     ********************************************************************************
     *  Met en avant les cases où le joueur en cours peut jouer
     ********************************************************************************
     */
    casesPossibles: function () {
        var cases = casesPossibles(this.echiquier, this.aQuiLeTour);

        for (var i = 0; i < cases.length; i++) {
            this.divs[cases[i].lig][cases[i].col].animate({
                backgroundColor: "#91cf91"
            }, 1000);
        }
    },

    /**
     ********************************************************************************
     *  Effectue un tour de jeu
     ********************************************************************************
     */
    joue: function (lig, col) {
        this.enCours = true;

        // Teste si la case est valable
        if (joueurVeutJouerEn(this.echiquier, lig, col, this.aQuiLeTour) == false) {
            $("#error").animate({
                opacity: 1
            }, 500, function () {
                $(this).animate({
                    opacity: 0
                }, 2000);
            });
            this.enCours = false;
            return;
        }

        console.log("Joue en " + lig + " " + col);

        // Remet la couleur de fond sur l'echiquier (utile si appuie sur aide)
        for (var i = 1; i <= 8; i++)
            for (var j = 1; j <= 8; j++)
                this.divs[i][j].css("background-color", "lightgrey");


        this.ajoutePion(lig, col, this.aQuiLeTour);
        // Inverse les cases
        var casesRetournees = casesGagnees(this.echiquier, lig, col, this.aQuiLeTour);


        for (var i = 0; i < casesRetournees.length; i++) {
            this.inversePion(casesRetournees[i].lig, casesRetournees[i].col);
        }

        // Met à jour les scores
        var nbB = parseInt(nbPionsDeCouleur(this.echiquier, BLANC), 10);
        var nbN = parseInt(nbPionsDeCouleur(this.echiquier, NOIR), 10);

        $("#scoreNoirs").html(nbN);
        $("#scoreBlancs").html(nbB);

        // Change le joueur qui doit jouer
        var etat = etatDeLaPartie(this.echiquier);

        if (etat == FINI) { // La partie est finie
            $('#joueurEnCours').html("THE END");
            var winner = "";
            if (nbN > nbB)
                winner = "BLACK IS THE WINNER";
            else
            if (nbB > nbN)
                winner = ">HITE IS THE WINNER";
            else winner = "DRAW";
            $("#info").html(winner).animate({
                opacity: 1
            }, 1000);
        } else {
            if (etat == NOIRNEPEUTPASJOUER) this.aQuiLeTour = BLANC;
            else
            if (etat == BLANCNEPEUTPASJOUER) this.aQuiLeTour = NOIR;
            else
                this.aQuiLeTour = (this.aQuiLeTour == BLANC) ? NOIR : BLANC;

            $('#joueurEnCours').html((this.aQuiLeTour == BLANC ? "White" : "Black") + " plays").hide().fadeIn("slow");
            this.enCours = false;
            afficheInformationsSurLaConsole(this.echiquier);
        }
    }
}



$(document).ready(function () {
    $("#info").css("opacity", 0);
    $("#error").css("opacity", 0);
    game.creeEchiquier();
    game.initialiseJeu();
    afficheInformationsSurLaConsole(game.echiquier);
    // Start the game
    $('#start').click(function () {
        game.initialiseJeu();
    });

    $('#help').click(function () {
        game.casesPossibles();
    });

})