<?php
require 'init.php';

// On récupère la liste des films via la base de données (ici c'est du fake ;-)
$film = fakedatafilm($_GET['id']);


// render the template file and echo it
echo $factory->make('film', ['titre' => 'Film', 'page' => "Un film", 'film'=>$film])->render();