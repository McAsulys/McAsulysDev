<?php
require 'init.php';

// On récupère la liste des films via la base de données (ici c'est du fake ;-)
$films = fakedatafilms();

// On récupère la liste des personnes via la base de données (ici aussi, c'est du fake)
$personnes = fakedatapersonnes();

// render the template file and echo it
echo $factory->make('all', ['titre' => 'Tous', 'page' => "Toutes les données", 'films'=>$films, 'personnes'=>$personnes])->render();