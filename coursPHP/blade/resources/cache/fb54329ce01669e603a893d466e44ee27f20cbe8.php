<?php $__env->startSection('content'); ?>

    sortie en :<?php echo e($film->annee); ?><br>
    nombre de spectateur : <?php echo e($film->nbSpectateurs); ?><br>
    réalisé par <a href="personne.php?id=<?php echo e($film->idRealisateur); ?>"><?php echo e($film->realisateur->nom); ?> <?php echo e($film->realisateur->prenom); ?></a>
    <br><br>
    Acteurs :
    <br><br>
    <?php $__currentLoopData = $film->acteurs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $acteur): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <li> <a href="personne.php?id=<?php echo e($acteur->id); ?>"><?php echo e($acteur->nom); ?> <?php echo e($acteur->prenom); ?></a> </li>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <!--<pre>
    <?php echo e(print_r($film)); ?>

  </pre>-->
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>