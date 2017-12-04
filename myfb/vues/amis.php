<?php
  include("../config/header.php");
 ?>

affichage des amis
<?php
include("../config/config.php");
include("../config/bd.php");
$sql = "SELECT login FROM user
        JOIN lien ON user.id = idUtilisateur2
        WHERE idUtilisateur1 = ?;";

$q = $pdo->prepare($sql);

print_r($_SESSION);

$q->execute($_SESSION["id"]); //session non déclaré ??

while($r = $q->fetch()){
  echo "$r <br>";
}



 ?>
