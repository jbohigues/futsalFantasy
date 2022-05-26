<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposusuarios */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="equiposusuarios-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idUsuario')->textInput() ?>

    <?= $form->field($model, 'idLiga')->textInput() ?>

    <?= $form->field($model, 'nombre')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'foto')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'puntos')->textInput() ?>

    <?= $form->field($model, 'dinero')->textInput() ?>

    <?= $form->field($model, 'numJugadores')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Guardar', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
