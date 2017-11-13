<?php

$sql = "SELECT * FROM user WHERE login=? AND mdp=PASSWORD(?)";

// Etape 1  :

$q = $pdo->prepare($sql);
$q->execute(array($_POST["login"],$_POST["passwd"]));

// Etape 2 : execution : 2 paramètres dans la requêtes !!

if($r = $q->fetch()){

	$_SESSION["id"] = $r["id"];
	$_SESSION["login"] = $r["login"];

	header("location: index.php");
}
else {
	//header("location: index.php?action=login");
}

// Etape 3 : ici le login est unique, donc on sait que l'on peut avoir zero ou une  seule ligne.

// un seul fetch


// Si $line est faux le couple login mdp est mauvais, on retourne au formulaire

// sinon on crée les variables de session $_SESSION['id'] et $_SESSION['login'] et on va à la page d'accueil

?>
