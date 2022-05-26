<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Logosequiposreales */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="logosequiposreales-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idEquipoReal')->textInput() ?>

    <?= $form->field($model, 'nombre')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
