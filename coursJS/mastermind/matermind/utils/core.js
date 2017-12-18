// ----- les constantes -----
const NOIR = 2;
const BLANC = 1;

const JEU = 0;
const TEST = 1;

const COULEURS = ['plum', 'red', 'green', 'blue', 'goldenrod', 'black', 'yellowgreen', 'lightblue'];
const MAX_COULEURS = 8;
const MIN_COULEURS = 5;

const MAX_COUPS = 12;
const MIN_COUPS = 4;

const MAX_TROUS = 6;
const MIN_TROUS = 4;

// ----- les parametres du jeu -----
var parametres = {
    mode: TEST,
    doublons: true,
    nbCouleurs: 6,
    nbCoups: 10,
    nbTrous: 4,
    ordonne: true
};

// ----- le jeu -----
var jeu = {
    historique: [],
    solution: [],
    indications: [],
    couleurChoisie: -1,
    proposition: [],
    coup: 0,
    enCours: true,
    coupSuivant: function () {
        jeu.afficherIndications();
        jeu.historique[jeu.coup] = jeu.proposition.slice();
        jeu.proposition = [];
        if (jeu.coup < parametres.nbCoups) jeu.coup++;
        if (jeu.coup == parametres.nbCoups) jeu.montrerSolution(false);
        _utils.showCurrentLine();
    },
    raz: function () {
        // définir une nouvelle combinaison secrete
        if (parametres.doublons) {
            if (typeof combinaisonSecrete !== 'function') {
                _utils.error("La fonction 'combinaisonSecrete' n'est pas définie");
            } else {
                jeu.solution = combinaisonSecrete(parametres.nbTrous, parametres.nbCouleurs);
            }
        }
        else {
            if (typeof combinaisonSecreteSansDoublons !== 'function') {
                _utils.error("La fonction 'combinaisonSecreteSansDoublons' n'est pas définie");
            } else {
                jeu.solution = combinaisonSecreteSansDoublons(parametres.nbTrous, parametres.nbCouleurs);
            }
        }
        // raz les variables du jeu
        jeu.historique = [];
        jeu.proposition = [];
        jeu.indications = [];
        jeu.couleurChoisie = -1;
        jeu.coup = 0;
        jeu.enCours = true;
        $(".razable").empty();
        // placer la combinaison secrete
        $("#solution").append(_utils.newSolution(parametres.mode === TEST));
        // afficher le plateau
        for (let i = parametres.nbCoups - 1; i >= 0; i--) {
            let row1 = $("<ul id='ligne" + i + "'></ul>");
            for (let j = 0; j < parametres.nbTrous; j++) {
                row1.append(_utils.newHole(i, j));
            }
            row1.append(_utils.newTinyHoles(i));
            $("#plateau").append(row1);
        }
        _utils.showCurrentLine();
        // afficher les selecteurs de couleurs
        $('#couleurs').append(_utils.newColorSelectors());
        // activer les boutons de réglage
        $(".reglage").prop("disabled", false);
    },
    montrerSolution: function (trouve = true) {
        $("#solution").fadeOut(500, function () {
            if (trouve) {
                $("#solution").empty().html("<div> Vous avez gagné !! </div>");
            }
            else {
                $("#solution").empty().append(_utils.newSolution());
            }
            $("#solution").fadeIn(500);
        });
        jeu.enCours = false;
    },
    afficherIndications: function () {
        if (typeof(calculerIndications) !== 'function') _utils.error("La fonction 'calculerIndications' n'est pas définie");
        else jeu.indications[jeu.coup] = calculerIndications(jeu.proposition, jeu.solution, parametres.nbTrous);
        if (!parametres.ordonne) {
            if (typeof(aggegerIndications) !== 'function') {
                _utils.error("La fonction 'aggegerIndications n'est pas définie'");
                return;
            }
            let x = aggegerIndications(jeu.indications[jeu.coup], parametres.nbTrous);
            if (x instanceof Object && typeof(x.noirs) === 'number' && typeof(x.blancs) === 'number') {
                let index = 0;
                for (let i = 0; i < x.noirs; i++)  _utils.addHoleCircle($("#indice" + jeu.coup + (index++)), 10, "black", "silver");
                for (let i = 0; i < x.blancs; i++)  _utils.addHoleCircle($("#indice" + jeu.coup + (index++)), 10, "white", "silver");
            }
            else {
                _utils.error("les données retournées par la fonctions 'aggregerIndications()' sont mal formées");
            }
        } else {
            let c = ['#bbb', 'white', 'black'];
            for (let i = 0; i < parametres.nbTrous; i++) {
                if (jeu.indications[jeu.coup][i] > 0) {
                    _utils.addHoleCircle($("#indice" + jeu.coup + i), 10, c[jeu.indications[jeu.coup][i]], "silver");
                }
            }
        }
    }
};

var _utils = {
    error: function (msg) {
        $('#error .modal-body').text(msg);
        $('#error').modal('show');
    },
    emphasisHoles: function (canvas) {
        let radius = 40;
        let fillColor = "white";
        let strokeColor = "SaddleBrown";
        canvas.attr('width', radius);
        canvas.attr('height', radius);
        for (let i = 0; i < parametres.nbTrous; i++) {
            let context = canvas[i].getContext('2d');
            let r = radius / 2;
            context.beginPath();
            context.arc(r, r, r * 0.9, 0, 2 * Math.PI, false);
            context.fillStyle = fillColor;
            context.fill();
            context.lineWidth = radius / 10;
            context.strokeStyle = strokeColor;
            context.stroke();
        }
    },
    addHoleCircle: function (canvas, radius, fillColor, strokeColor = null) {
        canvas.attr('width', radius);
        canvas.attr('height', radius);
        let context = canvas[0].getContext('2d');
        let r = radius / 2;

        context.beginPath();
        context.arc(r, r, r * 0.9, 0, 2 * Math.PI, false);
        context.fillStyle = fillColor;
        context.fill();
        context.lineWidth = radius / 10;
        if (strokeColor) {
            context.strokeStyle = strokeColor;
            context.stroke();
        }
    },
    addBall: function (canvas, radius, fillColor, strokeColor = null) {
        canvas.attr('width', radius);
        canvas.attr('height', radius);
        var context = canvas[0].getContext('2d');
        var r = radius / 2;

        var grd = context.createRadialGradient(r * 0.7, r * 0.7, 1, r, r, radius * 0.75);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, fillColor);

        context.beginPath();
        context.arc(r, r, r * 0.95, 0, 2 * Math.PI, false);
        context.fillStyle = grd;
        context.fill();
        context.lineWidth = 2;
        if (strokeColor) {
            context.strokeStyle = strokeColor;
            context.stroke();
        }
    },
    addBallsLine: function (canvasList, colorsList) {
        let radius = 40;
        let r = radius / 2;
        canvasList.attr('width', radius);
        canvasList.attr('height', radius);
        for (let i = 0; i < canvasList.length; i++) {
            let context = canvasList[i].getContext('2d');
            let grd = context.createRadialGradient(r * 0.7, r * 0.7, 1, r, r, radius * 0.75);
            grd.addColorStop(0, "white");
            grd.addColorStop(1, COULEURS[colorsList[i]]);
            context.beginPath();
            context.arc(r, r, r * 0.95, 0, 2 * Math.PI, false);
            context.fillStyle = grd;
            context.fill();
        }
    },
    newSolution: function (visible = true) {
        if (jeu.solution.length !== parametres.nbTrous) {
            _utils.error("La combinaison secrète possède " + jeu.solution.length + " valeurs au lieu de " + parametres.nbTrous);
            return;
        }
        let liste = $("<ul></ul>");
        let color = '#666';
        for (let i = 0; i < parametres.nbTrous; i++) {
            let element = $("<li></li>");
            if (visible) color = COULEURS[jeu.solution[i]];
            let hole = $("<canvas></canvas>");
            _utils.addBall(hole, 40, color);
            element.append(hole);
            liste.append(element);
        }
        return liste;
    },
    newHole: function (i, j) {
        let box = $("<li></li>");
        let hole = $("<canvas class='hole'></canvas>");
        let f = function (event) {
            if (event.data.n == jeu.coup && jeu.couleurChoisie > -1 && jeu.enCours) {
                _utils.addBall(hole, 40, COULEURS[jeu.couleurChoisie]);
                jeu.proposition[j] = jeu.couleurChoisie;
            }
        };
        hole.on("click", {n: i}, f);
        _utils.addHoleCircle(hole, 40, 'FloralWhite', 'DarkGoldenrod');
        box.append(hole);
        return box;
    },
    newTinyHoles: function (level) {
        let indicsBox = $("<li></li>");
        let row = $("<span></span>");
        for (let i = 0; i < parametres.nbTrous; i++) {
            let hole = $("<canvas id='indice" + level + i + "'></canvas>");
            _utils.addHoleCircle(hole, 10, '#bbb', '#111');
            row.append(hole);
        }
        row.on("dblclick", function () {
            if (typeof(aider) !== 'function') return;
            let x = aider();
            let correct = true;
            for (let i = 0; i < parametres.nbTrous && correct; i++) {
                if (x === undefined || x[i] === undefined || x[i] < 0 || x[i] >= parametres.nbCouleurs) {
                    correct = false;
                    alert("le format de la proposition est incorrect:", x);
                }
            }
            if (correct) {
                jeu.proposition = x;
                let c = $("ul#ligne" + jeu.coup + ">li>canvas");
                _utils.addBallsLine(c, jeu.proposition);
            }
        });
        indicsBox.append(row);
        if (parametres.nbTrous > 4) row.css("width", "50px");
        return indicsBox;
    },
    selectColor: function (event) {
        if (jeu.couleurChoisie === -1) {
            $(".reglage").prop("disabled", true);
        } else {
            _utils.addBall($("#colorCircle" + jeu.couleurChoisie), 40, COULEURS[jeu.couleurChoisie]);
        }
        if (jeu.couleurChoisie !== event.data.id) {
            _utils.addBall($("#colorCircle" + event.data.id), 50, COULEURS[event.data.id]);
            jeu.couleurChoisie = event.data.id;
        }
    },
    newColorSelectors: function () {
        let row = $("<ul></ul>");
        for (let i = 0; i < parametres.nbCouleurs; i++) {
            let newBox = $("<li id='colorBox" + i + "'></li>");
            newBox.on("click", {id: i}, _utils.selectColor);
            let newCanvas = $("<canvas class='circle' id='colorCircle" + i + "'></canvas>");
            _utils.addBall(newCanvas, 40, COULEURS[i]);
            newBox.append(newCanvas);
            row.append(newBox);
        }
        return row;
    },
    showCurrentLine: function () {
        if (jeu.enCours) {
            _utils.emphasisHoles($("ul#ligne" + jeu.coup + " li canvas.hole"));
        }
    }
};

$(document).ready(function () {
    // le jeu
    jeu.raz();
    // les commandes
    $("#mode").on("click", function () {
        parametres.mode = 1 - parametres.mode;
        if (parametres.mode === JEU) $(this).text(" mode jeu");
        else $(this).text(" mode test");
        $("#solution").empty().append(_utils.newSolution(parametres.mode === TEST));
    });
    $("#doublons").on("click", function () {
        if (parametres.nbCouleurs < parametres.nbTrous) parametres.doublons = true;
        else parametres.doublons = !parametres.doublons;
        $(this).text((parametres.doublons ? " doublons" : " simples"));
        jeu.raz();
    });
    $("#nbCouleurs").on("click", function () {
        parametres.nbCouleurs++;
        if (parametres.nbCouleurs > MAX_COULEURS) parametres.nbCouleurs = MIN_COULEURS;
        if (!parametres.doublons && parametres.nbCouleurs < parametres.nbTrous) parametres.nbCouleurs = parametres.nbTrous;
        $(this).text(" " + parametres.nbCouleurs + " couleurs");
        jeu.raz();
    });
    $("#nbCoups").on("click", function () {
        parametres.nbCoups++;
        if (parametres.nbCoups > MAX_COUPS) parametres.nbCoups = MIN_COUPS;
        let margin = (parametres.nbCoups - 3) * 30 - 50;
        $("#commandes>ul").css("margin-top", margin + "px");
        $(this).text(" " + parametres.nbCoups + " coups");
        jeu.raz();
    });
    $("#nbTrous").on("click", function () {
        $(".razable").removeClass("col-md-" + parametres.nbTrous);
        parametres.nbTrous++;
        if (parametres.nbTrous > MAX_TROUS) parametres.nbTrous = MIN_TROUS;
        if (!parametres.doublons && parametres.nbCouleurs < parametres.nbTrous) {
            parametres.nbTrous = MIN_TROUS;
        }
        $(".razable").addClass("col-md-" + parametres.nbTrous);
        $(this).text(" " + parametres.nbTrous + " trous");
        jeu.raz();
    });
    $("#infos").on("click", function () {
        parametres.ordonne = !parametres.ordonne;
        $(this).text((parametres.ordonne ? " " : " non ") + "ordonné");
    });
    $("#recommencer").on("click", jeu.raz);
    $("#valider").on("click", function () {
        if (typeof(dejaJoue) !== 'function') {
            _utils.error("La fonction 'dejaJoue' n'est pas définie");
            return;
        }
        let numLigne = dejaJoue(jeu.proposition, jeu.historique);
        if (numLigne > -1) {
            $("ul#ligne" + numLigne + ">li>canvas").animate({"backgroundColor": "black"}, 1000, function () {
                $("ul#ligne" + numLigne + ">li>canvas").animate({"backgroundColor": "#D2B48C"}, 1000);
            });
        } else {
            if (typeof(valider) !== 'function') {
                _utils.error("La fonction 'valider' n'est pas définie");
                return;
            }
            valider(jeu.proposition, jeu.solution, parametres.nbTrous, parametres.nbCouleurs);
        }
    });
});



