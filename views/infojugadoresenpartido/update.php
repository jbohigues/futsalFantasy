<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Infojugadoresenpartido */

$this->title = 'Update Infojugadoresenpartido: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Infojugadoresenpartidos', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="infojugadoresenpartido-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
