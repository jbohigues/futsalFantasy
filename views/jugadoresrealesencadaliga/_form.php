<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Jugadoresrealesencadaliga */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="jugadoresrealesencadaliga-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idJugadorReal')->textInput() ?>

    <?= $form->field($model, 'idLiga')->textInput() ?>

    <?= $form->field($model, 'idEquipoUser')->textInput() ?>

    <?= $form->field($model, 'titular')->checkbox() ?>

    <?= $form->field($model, 'mercado')->checkbox() ?>

    <?= $form->field($model, 'valorTransferencia')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
