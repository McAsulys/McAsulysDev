<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Une super page</title>
    <style>
        .vert {  color: lightgreen;  }
        .bleu {  color: cornflowerblue;  }
        .marron {  color: rosybrown;  }
    </style>
</head>

<body>
<p>
    <span class="bleu">Du bleu</span>
    <br/><span class="vert">Du vert</span>
    <br/><span class="marron">Du marron</span>
</p>
<div>
    <ul>
        <li>Le premier item</li>
        <li>Le deuxième item</li>
        <li class="special">Encore un item, mais celui la est spécial</li>
        <li>Le dernier</li>
    </ul>

    <p class="special">
        Ici un paragraphe spécial. Il ne sert à rien, mais c'est pas grave.
    </p>

    <p>
        Encore un paragraphe.
    </p>
</div>
<script type="text/javascript" src="../jquery-3.2.1.min.js"></script>
<script type="text/javascript" src="exo1.js">

</script>
</body>
</html>
