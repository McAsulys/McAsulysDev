<?php

class Personne {
    public $id;
    public $nom;
    public $prenom;
    public $naissance;
    public $pays;

    public function __construct($nom, $prenom,$naissance, $pays,$id) {
        $this->nom = $nom;
        $this->prenom = $prenom;
        $this->naissance = $naissance;
        $this->pays = $pays;
        $this->id = $id;
    }

}
