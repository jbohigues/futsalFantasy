<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\JugadoresReales;

/* @var $this yii\web\View */
/* @var $model app\models\JugadoresReales */

$this->title = $model->alias;
$this->params['breadcrumbs'][] = ['label' => 'Jugadores Reales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="jugadores-reales-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Actualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro que quieres eliminar este jugador?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
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
            'foto',
            'idEquipoReal',
        ],
    ]) ?>

</div>
