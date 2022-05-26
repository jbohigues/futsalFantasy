<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\IconosestadojugadorSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Iconosestadojugadors';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="iconosestadojugador-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Iconosestadojugador', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'imagen',
            'estado',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Iconosestadojugador $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
