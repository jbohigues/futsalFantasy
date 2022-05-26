<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\FotosjugadoresrealesSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Fotosjugadoresreales';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="fotosjugadoresreales-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Fotosjugadoresreales', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'idJugadorReal',
            'nombre',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Fotosjugadoresreales $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
