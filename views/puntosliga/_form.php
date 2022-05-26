<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Puntosliga */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="puntosliga-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'idLiga')->textInput() ?>

    <?= $form->field($model, 'titular')->textInput() ?>

    <?= $form->field($model, 'golDL')->textInput() ?>

    <?= $form->field($model, 'golMC')->textInput() ?>

    <?= $form->field($model, 'golDF')->textInput() ?>

    <?= $form->field($model, 'golPT')->textInput() ?>

    <?= $form->field($model, 'primeraAmarilla')->textInput() ?>

    <?= $form->field($model, 'segundaAmarilla')->textInput() ?>

    <?= $form->field($model, 'rojaDirecta')->textInput() ?>

    <?= $form->field($model, 'malPartido')->textInput() ?>

    <?= $form->field($model, 'noJuegaPartido')->textInput() ?>

    <?= $form->field($model, 'buenPartido')->textInput() ?>

    <?= $form->field($model, 'excelentePartido')->textInput() ?>

    <?= $form->field($model, 'perfectoPartido')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
