<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Iconosestadojugador */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="iconosestadojugador-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'imagen')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'estado')->dropDownList([ 'OK' => 'OK', 'L' => 'L', 'EX' => 'EX', 'P' => 'P', ], ['prompt' => '']) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
