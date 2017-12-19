@extends('layouts.app')

@section('content')
  Né le {{$personne->naissance}} ({{$personne->pays}})<br>
  Réalisateur de : <br>
    @foreach ($personne->realisations as $film)
      <li> <a href="film.php?id={{$film->id}}">{{$film->titre}}</a> </li>
    @endforeach
  <br><br>
  Acteur dans : <br><br>
    @foreach ($personne->acteurs as $film)
      <li> <a href="film.php?id={{$film->id}}">{{$film->titre}}</a> </li>
    @endforeach
    <!--<pre>
    {{  print_r($personne)  }}
  </pre>-->
@endsection
