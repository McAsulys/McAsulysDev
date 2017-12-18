<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>


    <title><?php echo e($titre); ?></title>
</head>

<body>
<h1>Bienvenu sur ce super site</h1>
<nav>
    <a href="exo1.php">Exo 1</a>
    <a href="exo2.php">Exo 2</a>
    <a href="exo3.php">Exo 3</a>
</nav>
<h2>Page en cours : <?php echo e($page); ?></h2>
<div class="container">
    <?php echo $__env->yieldContent("content"); ?>
</div>
</body>
</html>
