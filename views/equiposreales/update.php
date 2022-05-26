<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposreales */

$this->title = 'Actualizar Equipo real: ' . $model->nombre;
$this->params['breadcrumbs'][] = ['label' => 'Equipos reales', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->nombre, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Actualizar';
?>
<div class="equiposreales-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
