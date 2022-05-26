<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposreales */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="equiposreales-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'nombre')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'foto')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'puntos')->textInput() ?>

    <?= $form->field($model, 'valor')->textInput() ?>

    <?= $form->field($model, 'partidosJugados')->textInput() ?>

    <?= $form->field($model, 'victorias')->textInput() ?>

    <?= $form->field($model, 'derrotas')->textInput() ?>

    <?= $form->field($model, 'empates')->textInput() ?>

    <?= $form->field($model, 'jugadores')->textInput() ?>

    <?= $form->field($model, 'lesionados')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Guardar', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
