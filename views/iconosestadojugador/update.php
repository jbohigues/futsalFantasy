<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Iconosestadojugador */

$this->title = 'Update Iconosestadojugador: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Iconosestadojugadors', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="iconosestadojugador-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
