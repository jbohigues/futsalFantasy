<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Iconosnoticias */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="iconosnoticias-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'tema')->dropDownList([ 'I' => 'I', 'T' => 'T', ], ['prompt' => '']) ?>

    <?= $form->field($model, 'imagen')->textInput(['maxlength' => true]) ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
