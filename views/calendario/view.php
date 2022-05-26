<?php

use yii\helpers\Html;
use yii\widgets\DetailView;
use app\models\Equiposreales;

/* @var $this yii\web\View */
/* @var $model app\models\Calendario */

$this->title = 'Partido '.$model->id;
$this->params['breadcrumbs'][] = ['label' => 'Calendario', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="calendario-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Actualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro que quieres eliminarlo?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
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
        ],
    ]) ?>

</div>
