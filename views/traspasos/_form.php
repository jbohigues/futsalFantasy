<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Traspasos */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="traspasos-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idJugador')->textInput() ?>

    <?= $form->field($model, 'idEquipoUserEmisor')->textInput() ?>

    <?= $form->field($model, 'idEquipoUserReceptor')->textInput() ?>

    <?= $form->field($model, 'precio')->textInput() ?>

    <?= $form->field($model, 'estado')->dropDownList([ 'P' => 'P', 'OK' => 'OK', 'R' => 'R', ], ['prompt' => '']) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
