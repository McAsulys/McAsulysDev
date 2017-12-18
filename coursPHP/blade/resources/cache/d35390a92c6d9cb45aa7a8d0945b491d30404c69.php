<?php $__env->startSection('content'); ?>
    <h3>Liste des films</h3>
    <pre>
    <?php echo e(print_r($films)); ?>

    </pre>

    <h3>Liste des personnes</h3>

    <pre>
        <?php echo e(print_r($personnes)); ?>

    </pre>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts/master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>