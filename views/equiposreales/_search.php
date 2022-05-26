<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\EquiposrealesSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="equiposreales-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'nombre') ?>

    <?= $form->field($model, 'foto') ?>

    <?= $form->field($model, 'puntos') ?>

    <?= $form->field($model, 'valor') ?>

    <?php // echo $form->field($model, 'partidosJugados') ?>

    <?php // echo $form->field($model, 'victorias') ?>

    <?php // echo $form->field($model, 'derrotas') ?>

    <?php // echo $form->field($model, 'empates') ?>

    <?php // echo $form->field($model, 'jugadores') ?>

    <?php // echo $form->field($model, 'lesionados') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
