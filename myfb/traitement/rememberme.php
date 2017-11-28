<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");

if(isset($_SESSION["login"])){
	$sql = "SELECT * FROM user WHERE login = ?";

	$q = $pdo->prepare($sql);
	$q->execute(array($_SESSION["login"]));

	$r = $q->fetch();
	$str = $r["login"].$r["mdp"].$r["email"];

	setcookie("rememberme",sha256($str),time()+60);

	$sql = "UPDATE user SET remember = ? WHERE id = ?";

	$q = $pdo->prepare($sql);
	$q->execute(array(sha256($str), $r["id"]));
}
else{
	if(isset($_COOKIE["rememberme"])){

	}
}
?>
