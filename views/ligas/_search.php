<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\LigasSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="ligas-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'nombre') ?>

    <?= $form->field($model, 'foto') ?>

    <?= $form->field($model, 'codigoLiga') ?>

    <?= $form->field($model, 'abono') ?>

    <?php // echo $form->field($model, 'numMaxPlantilla') ?>

    <?php // echo $form->field($model, 'numJugMercado') ?>

    <?php // echo $form->field($model, 'diasJugEnMercado') ?>

    <?php // echo $form->field($model, 'diasGestionPujas') ?>

    <?php // echo $form->field($model, 'idUsuarioLider') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
