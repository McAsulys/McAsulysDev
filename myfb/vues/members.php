<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");

/*
*créer un test pour savoir si la demande à déjà été faite
*/

 ?>

affichage des membres

<?php
$sql = "SELECT id, login FROM user";
$q = $pdo->prepare($sql);
$q->execute();

$list = "<ul>";
while ($r = $q->fetch()) {
  print_r($r);
  $list .= "<li>";
  $list .= $r['login'];
  $list .= "<a href=../traitement/adfriend.php?idAmis=";
  $list .= $r['id'];
  $list .= ">ajouter</a></li>";
}
echo $list."</ul>";
 ?>
