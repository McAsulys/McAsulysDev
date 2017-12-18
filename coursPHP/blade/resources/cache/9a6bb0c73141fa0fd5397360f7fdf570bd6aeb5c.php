<?php $__env->startSection('content'); ?>
  Né le <?php echo e($personne->naissance); ?> (<?php echo e($personne->pays); ?>)<br>
  Réalisateur de : <br>
    <?php $__currentLoopData = $personne->realisations; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $film): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <li> <a href="film.php?id=<?php echo e($film->id); ?>"><?php echo e($film->titre); ?></a> </li>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
  <br><br>
  Acteur dans : <br><br>
    <?php $__currentLoopData = $personne->acteurs; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $film): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <li> <a href="film.php?id=<?php echo e($film->id); ?>"><?php echo e($film->titre); ?></a> </li>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <!--<pre>
    <?php echo e(print_r($personne)); ?>

  </pre>-->
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>