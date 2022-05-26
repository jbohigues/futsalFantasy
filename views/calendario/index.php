<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Calendario;
use yii\grid\ActionColumn;
use app\models\Equiposreales;

/* @var $this yii\web\View */
/* @var $searchModel app\models\CalendarioSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Calendario';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="calendario-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Crear nuevo partido', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            // 'id',
            'jornada',
            ['attribute'=>'idLocal',
                'label' => 'Local',
                'filter'=>Equiposreales::lookup(),
                 'value'=>function ($data) { 
                    return $data->idLocal0->nombre;
                },
            ],
            ['attribute'=>'idVisitante',
                'label' => 'Visitante',
                'filter'=>Equiposreales::lookup(),
                 'value'=>function ($data) { 
                    return $data->idVisitante0->nombre;
                },
            ],
            'fecha',
            'jugado:boolean',
            'golesLocal',
            'golesVisitante',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Calendario $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
