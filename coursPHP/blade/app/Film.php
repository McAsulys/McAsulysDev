<?php

class Film {
    public $id;
    public $titre;
    public $annee;
    public $nbSpectateurs;
    public $idRealisateur;


    public function __construct($titre = "", $annee = "", $nbSpectateurs = "", $idr="",$id = false) {
        $this->titre = $titre;
        $this->annee = $annee;
        $this->nbSpectateurs = $nbSpectateurs;
        $this->idRealisateur = $idr;
        $this->id = $id;
    }
}
