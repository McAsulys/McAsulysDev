<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");
 ?>

<?php

$ar = array($_SESSION['id'],$_GET['idAmis']);

$sql = "INSERT INTO lien VALUES(NULL,?,?,2)";

$q = $pdo->prepare($sql);

$q->execute($ar);

header("location : ../vue/members.php"); 

 ?>
