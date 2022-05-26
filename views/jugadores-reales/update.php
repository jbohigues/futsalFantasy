<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresReales */

$this->title = 'Actualizar Jugador Real: ' . $model->alias;
$this->params['breadcrumbs'][] = ['label' => 'Jugadores Reales', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->alias, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Actualizar';
?>
<div class="jugadores-reales-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
