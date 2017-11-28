<?php
include("../config/header.php");
include("../config/config.php");
include("../config/bd.php");
?>
<?php
$titre = $_POST["titre"];
$contenu = $_POST["contenu"];
$date = date("d-m-y");
$id = $_SESSION["id"];

$req = $pdo->prepare("INSERT INTO ecrit VALUE(
        NULL,
        ?,
        ?,
        ?,
        NULL,
        ?,
        1,
      )");

$t = array($titre,$contenu,$date,$id);
$req->execute($t);
 ?>
