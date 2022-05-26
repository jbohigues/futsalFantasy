<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\IconosnoticiasSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Iconosnoticias';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="iconosnoticias-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Iconosnoticias', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'tema',
            'imagen',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Iconosnoticias $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
