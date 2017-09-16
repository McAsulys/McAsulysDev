<!DOCTYPE html>
<html lang="YOURLANG">
  <head>
    <meta charset="utf-8"/>
    <!--Missing Viewport, Favicon and so far...-->
    <title>Les création du Poney</title>
    <link rel="stylesheet" href="index.css">
  </head>
  <body>
    <img id="banner" src="http://blanc.leponeyblanc.fr/wp-content/uploads/2014/01/pinkie_pie_by_pony_spiz-d477lwt.png" alt="banner">
    <?php include "menue.php" ?>
    <div id="articles">
      <?php
      include "article.php";
      AllArticle();
       ?>
    </div>
  </body>
</html>
