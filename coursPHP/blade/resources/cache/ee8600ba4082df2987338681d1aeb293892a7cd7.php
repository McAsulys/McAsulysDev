<?php $__env->startSection('content'); ?>
    <pre>
    <?php echo e(print_r($personne)); ?>

    </pre>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts/master', array_except(get_defined_vars(), array('__data', '__path')))->render(); ?>