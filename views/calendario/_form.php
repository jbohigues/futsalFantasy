<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Calendario */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="calendario-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'jornada')->textInput() ?>

    <?= $form->field($model, 'idLocal')->textInput() ?>

    <?= $form->field($model, 'idVisitante')->textInput() ?>

    <?= $form->field($model, 'fecha')->textInput() ?>

    <?= $form->field($model, 'jugado')->checkbox() ?>

    <?= $form->field($model, 'golesLocal')->textInput() ?>

    <?= $form->field($model, 'golesVisitante')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Guardar', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
