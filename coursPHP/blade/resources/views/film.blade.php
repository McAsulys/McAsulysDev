@extends('layouts.app')

@section('content')

    sortie en :{{$film->annee}}<br>
    nombre de spectateur : {{$film->nbSpectateurs}}<br>
    réalisé par <a href="personne.php?id={{$film->idRealisateur}}">{{$film->realisateur->nom}} {{$film->realisateur->prenom}}</a>
    <br><br>
    Acteurs :
    <br><br>
    @foreach ($film->acteurs as $acteur)
      <li> <a href="personne.php?id={{$acteur->id}}">{{$acteur->nom}} {{$acteur->prenom}}</a> </li>
    @endforeach
    <!--<pre>
    {{  print_r($film)  }}
  </pre>-->
@endsection
