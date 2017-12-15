/********************************************************************************
 *  Comment stocker des coordonnées
 * Pour créer une nouvelle coordonnée : var coord = new Coordonnee(1,3);
 * ensuite
    - coord.lig retourne la ligne (ici 1)
    - coord.col retourne la colonne (ici 3)


 *******************************************************************************
 */
function Coordonnees(l, c) {
    this.lig = l;
    this.col = c;
}

/**
 ********************************************************************************
 * Affiche l'echiquier sur la console
 ********************************************************************************
 */

function afficheEchiquier(echiquier) { //WORK !

  for (var i = 1; i < echiquier.length; i++) {
    let tmp = "";
    for (var j = 1; j < echiquier[i].length; j++) {
      tmp += echiquier[i][j] + "";
    }
    console.log(tmp);
  }

}

/**
 ********************************************************************************
 * Cette fonction est appelée à chaque tour de boucle
 * Pour l'instant on affiche l echiquier sur la console et
 * le nombre de pions de chaque couleur,
 * vous pouvez y ajouter ce que vous voulez....
 ********************************************************************************
 */

function afficheInformationsSurLaConsole(echiquier) { //WORK !
    afficheEchiquier(echiquier);
    console.log("Nb noirs : " + nbPionsDeCouleur(echiquier, NOIR));
    console.log("Nb blancs : " + nbPionsDeCouleur(echiquier, BLANC));

    // Pour voir si gagneAGauche fonctionne
    console.log(gagneAGauche(echiquier, 3, 3, NOIR)); // renvoie un tableau VIDE
    console.log(gagneAGauche(echiquier, 4, 6, BLANC)); // renvoie un tableau contenant les coordonnées [(5,4)]

}

/**
 ********************************************************************************
 * Retourne le nombre de pions de la couleur passée en paramètre dans l'echiquier
 * @param echiquier : tableau à 2 dimensions entre 1 et 8
 * @param couleur   : BLANC ou NOIR
 * @return le nombre de cases de la couleur dans l'échiquier
 ********************************************************************************
 */

function nbPionsDeCouleur(echiquier, couleur) { //WORK !
    var nb = 0;

    for (var i = 1; i < echiquier.length; i++) {
      for (var j = 1; j < echiquier[i].length; j++) {
        if (echiquier[i][j] == couleur) {
          nb++;
        }
      }
    }
    return nb;
}




/**
 ********************************************************************************
 * Retourne le tableau des cases (si il y en a) qui sont entourées par le placement en x,y du joueur couleur
 * retourne un tableau vide si on ne gagne rien
 ********************************************************************************
 */



function gagneADroite(echiquier, lig, col, couleur) {
    var tmp = [];
    var oppose = couleur == BLANC ? NOIR : BLANC;
    col++;

    while (col < 9 && echiquier[lig][col] == oppose) {
      let c = new Coordonnees(lig,col);
      tmp.push(c);

      col++; //on se décale à droite
    }

    if(col < 9 || echiquier[lig][col] != couleur){
      return [];
    }
    return tmp;
}

function gagneAGauche(echiquier, lig, col, couleur) {
    var tmp = [];
    var oppose = couleur == BLANC ? NOIR : BLANC;
    col--;

    while (col > 0 && echiquier[lig][col] == oppose) {
      let c = new Coordonnees(lig,col);
      tmp.push(c);

      col--;
    }

    if (col > 0 || echiquier[lig][col] != couleur) {
      return [];
    }

    return tmp;
}

function gagneVertical(echiquier, lig, col, couleur, deltaL) {
    var tmp = [];
    var oppose = couleur == BLANC ? NOIR : BLANC;
    if (deltaL == 1) {
      lig++;
      while (lig < 9 && echiquier[lig][col] == oppose) {
        let c = new Coordonnees(lig,col);
        tmp.push(c);

        lig++;
      }
      if(col < 9 || echiquier[lig][col] != couleur){
        return [];
      }
    }
    else if (deltaL == -1) {
      lig--;
      while (lig > 0 && echiquier[lig][col] == oppose) {
        let c = new Coordonnees(lig,col);
        tmp.push(c);

        lig--;
      }
      if (lig > 0 || echiquier[lig][col] != couleur) {
        return [];
      }
    }
    // La même chose mais on utilise un deltaL=1 pour descendre et egal à -1 pour monter
    // dernière question
    return tmp;

}

/**
 ********************************************************************************
 * retourne l'ensemble (sous forme de tableau) des cases gagnées par le joueur couleur si il joue en lig,col
 * Appele les fonctions gagneAGauche, gagneADroite, gagneVertical...
 * Et remplie le tableau tmp
 * @return le tableau des coordonnées, peut être vide
 ********************************************************************************
 */
function casesGagnees(echiquier, lig, col, couleur) {
    var tmp = [];

    // On appelle gagneAGauche, gagneADroite
    // On utilise la fonction concat des tableaux

    return tmp;
}

/**
 ********************************************************************************
 * Retourne l'ensemble des cases où le joueur ayant la couleur passée en paramètre peut jouer
 * Il faut :
 *  - Parcourir tout l'echiquier
 *  - Si la case (c,l) est vide il faut demander le nombre de cases gagnées si on joue en (c,l)
 *  - Et ajouter à tmp une nouvelle coordonnée (c,l) si le le nombre de cases gagnées est > 0
 *  - retourner tmp
 ********************************************************************************
 */

function casesPossibles(echiquier, couleur) {
    var tmp = [];
    // pour toutes les lignes
    // Pour toutes les colonnes
    // Si la case est vide
    // On compte le nombre de cases gagnées en cette position
    // Si il y en a on ajoute la Coordonnée à tmp


    return tmp;
}



/**
 ********************************************************************************
 * Le joueur couleur souhaite jouer en position lig,col
 * @return  true si il a le droit, false sinon
 * Il faut appeler casesGagnees et vérifier que le résultat n'est pas un tableau vide
 ********************************************************************************
 */
function joueurVeutJouerEn(echiquier, lig, col, couleur) {
    // On peut jouer la si on gagen des cases à cette position

}

/**
  ********************************************************************************
  * Retourne l'etat courant de la partie
  * Renvoie FINI si la partie est finie :
  *    - Toutes les cases sont prises
  *    - Aucun joueur ne peut jouer (la fonction casesPossibles renvoie un tableau vide pour les deux joueurs NOIR et BLANC)

  * Renvoie NOIRNEPEUTPASJOUER si le joueur noir ne peut pas jouer (la fonction casesPossibles renvoie un tableau vide pour NOIR)
  * Renvoie BLANCNEPEUTPASJOUER si le joueur blanc ne peut pas jouer (la fonction casesPossibles renvoie un tableau vide pour BLANC)
  * Renvoie NORMAL dans les cas contraires (la partie est pas finie et tout le monde peut jouer)
  ********************************************************************************
*/

function etatDeLaPartie(echiquier) {
    // stocker dans une variable le nombre de pions blancs et noirs

    // Conditions pour savoir si l apartie est finie


    // Conditions pour NOIRNEPEUTPASJOUER et  BLANCNEPEUTPASJOUER


    return NORMAL; // Cas normal
}
