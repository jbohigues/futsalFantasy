<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Calendario */

$this->title = 'Actualizar Calendario: Partido ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Calendario', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => 'Partido '.$model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Actualizar';
?>
<div class="calendario-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
