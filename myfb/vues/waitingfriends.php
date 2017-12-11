<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");
 ?>

amis en attende d'acceptation

<?php
$sql = "SELECT id, login FROM user JOIN lien ON user.id = idUtilisateur1 WHERE etat = 2";
$q = $pdo->prepare($sql);
$q->execute();

$list = "<ul>";
while ($r = $q->fetch()) {
  print_r($r);
  $list .= "<li>";
  $list .= $r['login'];
  $list .= "<a href=../traitement/accept.php?idAmis=";
  $list .= $r['id'];
  $list .= ">accepter</a></li>";
}
echo $list."</ul>";
 ?>
