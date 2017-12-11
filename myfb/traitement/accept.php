<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");
 ?>

<?php

$ar = array($_SESSION['id'],$_GET['idAmis']);

$sql = "UPDATE lien SET etat = 1 WHERE idUtilisateur1 = ? AND idUtilisateur2 = ?";

$q = $pdo->prepare($sql);

$q->execute($ar);

header("location : ../index.php"); 

 ?>
