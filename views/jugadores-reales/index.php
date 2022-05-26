<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\grid\ActionColumn;
use app\models\JugadoresReales;

/* @var $this yii\web\View */
/* @var $searchModel app\models\JugadoresRealesSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Jugadores Reales';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="jugadores-reales-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Crear Jugador Real', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            // 'id',
            'nombre',
            'apellidos',
            'alias',
            'puntos',
            ['attribute'=>'posicion',
                'label' => 'Posicion',   //Si queremos cambiar el nombre de la etiqueta, pero mejor dejar la del modelo
                'filter' => JugadoresReales::$posicionOptions,
                'value'=>function($data){
                    return $data->posicionText;
                }
		    ],
            
            'valorMercado',
            ['attribute'=>'estado',
                'label' => 'Estado',   //Si queremos cambiar el nombre de la etiqueta, pero mejor dejar la del modelo
                'filter' => JugadoresReales::$estadoOptions,
                'value'=>function($data){
                    return $data->estadoText;
                }
		    ],
            // 'foto',
            //'idEquipoReal',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, JugadoresReales $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
