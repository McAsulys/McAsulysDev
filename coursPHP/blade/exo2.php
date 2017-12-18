<?php
require('init.php');

// render the template file and echo it
echo $factory->make('exo2', ['titre' => 'exo2', 'page' => 'exo2', 'utilisateur'=>'Gilles Audemard'])->render();