<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Ligas */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="ligas-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'nombre')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'foto')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'codigoLiga')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'abono')->textInput() ?>

    <?= $form->field($model, 'numMaxPlantilla')->textInput() ?>

    <?= $form->field($model, 'numJugMercado')->textInput() ?>

    <?= $form->field($model, 'diasJugEnMercado')->textInput() ?>

    <?= $form->field($model, 'diasGestionPujas')->textInput() ?>

    <?= $form->field($model, 'idUsuarioLider')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
