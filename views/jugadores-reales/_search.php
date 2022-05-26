<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresRealesSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="jugadores-reales-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'nombre') ?>

    <?= $form->field($model, 'apellidos') ?>

    <?= $form->field($model, 'alias') ?>

    <?= $form->field($model, 'puntos') ?>

    <?php // echo $form->field($model, 'posicion') ?>

    <?php // echo $form->field($model, 'valorMercado') ?>

    <?php // echo $form->field($model, 'estado') ?>

    <?php // echo $form->field($model, 'foto') ?>

    <?php // echo $form->field($model, 'idEquipoReal') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
