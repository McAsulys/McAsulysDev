<?php $__env->startSection('content'); ?>
  <div class="list_film">
    
    <h3>Liste des films</h3>
    <?php $__currentLoopData = $films; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $film): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <li><?php echo e($film->titre); ?></li>

    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    <!--<pre>
      <?php echo e(print_r($films)); ?>

    </pre>-->
  </div>
  <div class="list_acteur">


    <h3>Liste des personnes</h3>

    <?php $__currentLoopData = $personnes; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $personne): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
      <li><?php echo e($personne->nom); ?></li>
    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
  </div>
    <!--<pre>
      <?php echo e(print_r($personnes)); ?>

    </pre>-->
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>