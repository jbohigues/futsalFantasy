<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;
use app\models\JugadoresReales;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresReales */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="jugadores-reales-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'nombre')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'apellidos')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'alias')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'puntos')->textInput() ?>

    <?= $form->field($model, 'posicion')->dropDownList(JugadoresReales::$posicionOptions, ['prompt' => '']) ?>

    <?= $form->field($model, 'valorMercado')->textInput() ?>

    <?= $form->field($model, 'estado')->dropDownList(JugadoresReales::$estadoOptions, ['prompt' => '']) ?>

    <?= $form->field($model, 'foto')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'idEquipoReal')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Guardar', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
