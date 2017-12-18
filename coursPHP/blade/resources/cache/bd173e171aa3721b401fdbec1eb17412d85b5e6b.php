<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link rel="stylesheet" type="text/css" href="public/css/style.css" />

    <title><?php echo e($titre); ?></title>
</head>

<body>
  <h1>Bienvenu sur ce super site</h1>
  <h2>Le poney en robe rose</h2>
  <nav>
      <a href="exo1.php">Exo 1</a>
      <a href="exo2.php">Exo 2</a>
      <a href="all.php">Tous</a>
      <a href="film.php?id=4">film</a>
    </nav>
    <h2>Page en cours : <?php echo e($page); ?></h2>
    <div class="container">
      <?php echo $__env->yieldContent("content"); ?>
    </div>
</body>
</html>
