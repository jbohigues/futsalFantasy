<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\LigasSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Ligas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="ligas-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Ligas', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'nombre',
            'foto',
            'codigoLiga',
            'abono',
            //'numMaxPlantilla',
            //'numJugMercado',
            //'diasJugEnMercado',
            //'diasGestionPujas',
            //'idUsuarioLider',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Ligas $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
