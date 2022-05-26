<?php

use yii\helpers\Url;
use app\models\Ligas;
use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Usuarios;
use yii\grid\ActionColumn;
use app\models\Equiposusuarios;

/* @var $this yii\web\View */
/* @var $searchModel app\models\EquiposusuariosSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Equipos usuarios';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="equiposusuarios-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Crear nuevo EquipoUsuario', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            // 'id',
            ['attribute'=>'idUsuario',
                'label' => 'Usuario',
                'filter'=>Usuarios::lookup(),
                 'value'=>function ($data) { 
                    return $data->idUsuario0->usuario;
                },
            ],
            ['attribute'=>'idLiga',
                'label' => 'Liga',
                'filter'=>Ligas::lookup(),
                 'value'=>function ($data) { 
                    return $data->idLiga0->nombre;
                },
            ],
            'nombre',
            'foto',
            'puntos',
            //'dinero',
            'numJugadores',
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Equiposusuarios $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
