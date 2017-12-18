@extends('layouts.app')

@section('content')
  <div class="list_film">
    
    <h3>Liste des films</h3>
    @foreach ($films as $film)
      <li>{{$film->titre}}</li>

    @endforeach
    <!--<pre>
      {{ print_r($films) }}
    </pre>-->
  </div>
  <div class="list_acteur">


    <h3>Liste des personnes</h3>

    @foreach ($personnes as $personne)
      <li>{{$personne->nom}}</li>
    @endforeach
  </div>
    <!--<pre>
      {{ print_r($personnes) }}
    </pre>-->
@endsection
