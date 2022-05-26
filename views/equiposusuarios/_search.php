<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\EquiposusuariosSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="equiposusuarios-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'id') ?>

    <?= $form->field($model, 'idUsuario') ?>

    <?= $form->field($model, 'idLiga') ?>

    <?= $form->field($model, 'nombre') ?>

    <?= $form->field($model, 'foto') ?>

    <?php // echo $form->field($model, 'puntos') ?>

    <?php // echo $form->field($model, 'dinero') ?>

    <?php // echo $form->field($model, 'numJugadores') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
