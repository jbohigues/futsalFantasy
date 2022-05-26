<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Jugadoresrealesencadaliga */

$this->title = 'Update Jugadoresrealesencadaliga: ' . $model->idJugadorReal;
$this->params['breadcrumbs'][] = ['label' => 'Jugadoresrealesencadaligas', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->idJugadorReal, 'url' => ['view', 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="jugadoresrealesencadaliga-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
