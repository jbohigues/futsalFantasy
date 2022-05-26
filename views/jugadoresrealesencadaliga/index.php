<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\JugadoresrealesencadaligaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Jugadoresrealesencadaligas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="jugadoresrealesencadaliga-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Jugadoresrealesencadaliga', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'idJugadorReal',
            'idLiga',
            'idEquipoUser',
            'titular:boolean',
            'mercado:boolean',
            //'valorTransferencia',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Jugadoresrealesencadaliga $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'idJugadorReal' => $model->idJugadorReal, 'idLiga' => $model->idLiga]);
                 }
            ],
        ],
    ]); ?>


</div>
