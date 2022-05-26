<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresrealesencadaligaSearch */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="jugadoresrealesencadaliga-search">

    <?php $form = ActiveForm::begin([
        'action' => ['index'],
        'method' => 'get',
    ]); ?>

    <?= $form->field($model, 'idJugadorReal') ?>

    <?= $form->field($model, 'idLiga') ?>

    <?= $form->field($model, 'idEquipoUser') ?>

    <?= $form->field($model, 'titular')->checkbox() ?>

    <?= $form->field($model, 'mercado')->checkbox() ?>

    <?php // echo $form->field($model, 'valorTransferencia') ?>

    <div class="form-group">
        <?= Html::submitButton('Search', ['class' => 'btn btn-primary']) ?>
        <?= Html::resetButton('Reset', ['class' => 'btn btn-outline-secondary']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
