<?php
	include("config/header.php");
	include("config/actions.php");

	if(isset($_GET["action"])){
		$action = $_GET["action"];
		//print $listeDesActions[$action];
		header("location: $listeDesActions[$action]");

	}
	else {
		if(isset($_SESSION["sessions"])){
			header("location: index.php?action=amis");
		}
		else{
			header("location: index.php?action=connexion");
		}
	}


?>

<!DOCTYPE html>
<html lang="fr">
	<head>
		<meta charset="utf-8">
			<meta http-equiv="X-UA-Compatible" content="IE=edge">
			<meta name="viewport" content="width=device-width, initial-scale=1">


    <title>Facebook</title>
		<!-- Bootstrap core CSS -->
		<link href="./css/bootstrap.min.css" rel="stylesheet">

		<!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
		<!--<link href="./css/ie10.css" rel="stylesheet"> -->


		<!-- Ma feuille de style à moi -->
		<link href="./css/style.css" rel="stylesheet">

		<script src="js/jquery-3.2.1.min.js"></script>
		<script src="js/bootstrap.min.js"></script>
	</head>

	<body>
		<div id= "header">
			<h3>Mon Facebook à moi !</h3>
		</header>

		<div class="amis">
			<?php include("vues/amis.php") ?>

		</div>

		<div class="pasDeReponse">
			Ceux la ne vous ont pas répondu, snif !
		</div>

		<div class="attente">
			Ceux la espèrent que vous aller leur dire oui !
		</div>

		<div class="recherche">
			<input type="submit" value="Rechercher des amis">Hop...
			<p>Résultat de la recherche</p>
		</div>
		<form class="login" action="index.php?action=login" method="post">
			<input type="submit" name="login" value="login">
		</form>
		<form class="signup" action="index.php?action=signup" method="post">
			<input type="submit" name="login" value="longin">
		</form>

	</body>
</html>
