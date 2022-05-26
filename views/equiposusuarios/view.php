<?php

use yii\helpers\Url;
use app\models\Ligas;
use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Usuarios;
use yii\widgets\DetailView;
use app\models\Equiposreales;
use app\models\JugadoresReales;
use yii\data\ActiveDataProvider;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposusuarios */

$this->title = $model->nombre;
$this->params['breadcrumbs'][] = ['label' => 'Equipos usuarios', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="equiposusuarios-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Actualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro que quieres eliminar este equipo ?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
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
            // 'dinero',
            'numJugadores',
        ],
    ]) ?>

    <h3>Plantilla</h3>
    <?= GridView::widget([
        'dataProvider' => new ActiveDataProvider([
                        'query'=>$model->getJugadoresrealesencadaligas(),
                        'pagination'=>['pageSize'=>6,]
                    ]),
        'columns' => [
            ['attribute'=>'idJugadorReal',
                'label' => 'Jugador',
                'filter'=>JugadoresReales::lookup(),
                 'value'=>function ($data) { 
                    return $data->idJugadorReal0->alias;
                },
            ],
            ['attribute'=>'idLiga',
                'label' => 'Liga',
                'filter'=>Ligas::lookup(),
                 'value'=>function ($data) { 
                    return $data->idLiga0->nombre;
                },
            ],
            'titular',
            'mercado',
            'valorTransferencia',

            ['class' => 'yii\grid\ActionColumn',
                'urlCreator'=>function ($action,$model, $key,  $index) {
                    return Url::toRoute(['jugadoresrealesencadaliga/'.$action,['idJugadorReal'=>$model->idJugadorReal, 'idLiga'=>$model->idLiga]]);
                } 
            ],

        ],
    ]); ?>
</div>
