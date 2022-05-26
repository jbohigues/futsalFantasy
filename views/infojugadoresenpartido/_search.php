<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\InfojugadoresenpartidoSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="infojugadoresenpartido-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'idPartido') ?>

    <?= $form->field($model, 'idJugador') ?>

    <?= $form->field($model, 'titular')->checkbox() ?>

    <?= $form->field($model, 'goles') ?>

    <?php // echo $form->field($model, 'amarillas') ?>

    <?php // echo $form->field($model, 'rojaDirecta')->checkbox() ?>

    <?php // echo $form->field($model, 'juegoEnPartido') ?>

    <?php // echo $form->field($model, 'puntos') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
