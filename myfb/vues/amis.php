<?php
  //include("../config/header.php");
 ?>

affichage des amis <br>
<?php
//include("../config/config.php");
//include("../config/bd.php");
$sql = "SELECT login FROM user
        JOIN lien ON user.id = idUtilisateur2
        WHERE idUtilisateur1 = ?;";

$q = $pdo->prepare($sql);

$q->execute(array($_SESSION["id"]));
$list = "<ul class='list-amis'>";
while($r = $q->fetch()){
  $list .= "<li><a href=''>".$r['login']."</a></li>";
}
echo $list."</ul>";


 ?>
