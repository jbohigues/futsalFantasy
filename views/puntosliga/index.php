<?php

use yii\helpers\Html;
use yii\helpers\Url;
use yii\grid\ActionColumn;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\PuntosligaSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Puntosligas';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="puntosliga-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Puntosliga', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'id',
            'idLiga',
            'titular',
            'golDL',
            'golMC',
            //'golDF',
            //'golPT',
            //'primeraAmarilla',
            //'segundaAmarilla',
            //'rojaDirecta',
            //'malPartido',
            //'noJuegaPartido',
            //'buenPartido',
            //'excelentePartido',
            //'perfectoPartido',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Puntosliga $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
