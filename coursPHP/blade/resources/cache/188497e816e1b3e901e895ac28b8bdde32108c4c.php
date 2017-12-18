<?php $__env->startSection('content'); ?>
    <b>Bienvenu <?php echo e($utilisateur); ?></b>
<?php $__env->stopSection(); ?>
<?php echo $__env->make('layouts.app', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>