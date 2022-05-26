<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Noticias */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="noticias-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idLiga')->textInput() ?>

    <?= $form->field($model, 'tema')->dropDownList([ 'I' => 'I', 'T' => 'T', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'texto')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'fecha')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
