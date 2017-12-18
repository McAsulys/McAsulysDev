<?php
require('init.php');


// render the template file and echo it
echo $factory->make('exo1', ['titre' => 'bienvenu', 'page' => 'principale'])->render();
