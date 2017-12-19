<?php
require 'init.php';

// On récupère la liste des films via la base de données (ici c'est du fake ;-)
$personne = fakedatapersonne($_GET['id']);


// render the template file and echo it
echo $factory->make('personne', ['titre' => 'bienvenu', 'page' => "Une personne", 'personne'=>$personne])->render();