<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Infojugadoresenpartido */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="infojugadoresenpartido-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idPartido')->textInput() ?>

    <?= $form->field($model, 'idJugador')->textInput() ?>

    <?= $form->field($model, 'titular')->checkbox() ?>

    <?= $form->field($model, 'goles')->textInput() ?>

    <?= $form->field($model, 'amarillas')->textInput() ?>

    <?= $form->field($model, 'rojaDirecta')->checkbox() ?>

    <?= $form->field($model, 'juegoEnPartido')->dropDownList([ 'MP' => 'MP', 'NJ' => 'NJ', 'BP' => 'BP', 'EP' => 'EP', 'PP' => 'PP', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'puntos')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
