<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\PuntosligaSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="puntosliga-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'idLiga') ?>

    <?= $form->field($model, 'titular') ?>

    <?= $form->field($model, 'golDL') ?>

    <?= $form->field($model, 'golMC') ?>

    <?php // echo $form->field($model, 'golDF') ?>

    <?php // echo $form->field($model, 'golPT') ?>

    <?php // echo $form->field($model, 'primeraAmarilla') ?>

    <?php // echo $form->field($model, 'segundaAmarilla') ?>

    <?php // echo $form->field($model, 'rojaDirecta') ?>

    <?php // echo $form->field($model, 'malPartido') ?>

    <?php // echo $form->field($model, 'noJuegaPartido') ?>

    <?php // echo $form->field($model, 'buenPartido') ?>

    <?php // echo $form->field($model, 'excelentePartido') ?>

    <?php // echo $form->field($model, 'perfectoPartido') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
