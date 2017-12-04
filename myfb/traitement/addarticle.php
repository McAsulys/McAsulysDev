<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");
?>
<?php
$titre = $_POST["titre"];
$contenu = $_POST["contenu"];
$date = date("y-m-d h:m:s");
$id = $_SESSION["id"];

$req = $pdo->prepare("INSERT INTO ecrit VALUES(NULL,?,?,?,NULL,?,1);");

$t = array($titre,$contenu,$date,$id);
$req->execute($t);

header("location: ../index.php?action=mur");
 ?>
