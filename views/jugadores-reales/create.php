<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresReales */

$this->title = 'Crear Jugador Real';
$this->params['breadcrumbs'][] = ['label' => 'Jugadores Reales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="jugadores-reales-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
