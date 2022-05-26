<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/* @var $this yii\web\View */
/* @var $model app\models\Jugadoresrealesencadaliga */

$this->title = $model->idJugadorReal;
$this->params['breadcrumbs'][] = ['label' => 'Jugadoresrealesencadaligas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="jugadoresrealesencadaliga-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'idJugadorReal',
            'idLiga',
            'idEquipoUser',
            'titular:boolean',
            'mercado:boolean',
            'valorTransferencia',
        ],
    ]) ?>

</div>
