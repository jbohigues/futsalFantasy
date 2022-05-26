<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\CalendarioSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="calendario-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'jornada') ?>

    <?= $form->field($model, 'idLocal') ?>

    <?= $form->field($model, 'idVisitante') ?>

    <?= $form->field($model, 'fecha') ?>

    <?php // echo $form->field($model, 'jugado')->checkbox() ?>

    <?php // echo $form->field($model, 'golesLocal') ?>

    <?php // echo $form->field($model, 'golesVisitante') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
