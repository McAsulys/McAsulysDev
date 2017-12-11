<?php
include("../config/header.php");
 ?>
Cecie est le mur
<a href="ecris.php">écrire un nouvelle article</a><br>
<a href="amis.php">vos amis</a><br>
<a href="members.php">les autres membres</a><br>

<?php
include("../config/config.php");
include("../config/bd.php");

$id = $_SESSION["id"];


$req = $pdo->prepare("SELECT * FROM ecrit where idAuteur = ? ORDER BY dateEcrit DESC;");
$req->execute(array($id));
$list = "<ul class='ecris list'>";
while ($r = $req->fetch()) {
  $list .= "<li>
              <ul>
                <li class='ecris__titre'>".$r["titre"]."</li>
                <li class='ecris__contenu'>".$r["contenu"]."</li>
                <li class='ecris__date'>".$r["dateEcrit"]."</li>
              </ul>
            </li>";
}
echo $list."</ul>";
 ?>
