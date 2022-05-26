<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\grid\ActionColumn;
use app\models\Equiposreales;

/* @var $this yii\web\View */
/* @var $searchModel app\models\EquiposrealesSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Equipos Reales';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="equiposreales-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Crear Equipo Real', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            // 'id',
            'nombre',
            'foto',
            'puntos',
            'valor',
            //'partidosJugados',
            //'victorias',
            //'derrotas',
            //'empates',
            //'jugadores',
            //'lesionados',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Equiposreales $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
