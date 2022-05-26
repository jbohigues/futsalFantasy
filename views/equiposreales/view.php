<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use yii\widgets\DetailView;
use yii\data\ActiveDataProvider;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposreales */

$this->title = $model->nombre;
$this->params['breadcrumbs'][] = ['label' => 'Equiposreales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="equiposreales-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Actualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro que quieres eliminar este equipo?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            // 'id',
            'nombre',
            'foto',
            'puntos',
            'valor',
            'partidosJugados',
            'victorias',
            'derrotas',
            'empates',
            'jugadores',
            'lesionados',
        ],
    ]) ?>

     <h3>Plantilla</h3>
    <?= GridView::widget([
        'dataProvider' => new ActiveDataProvider([
                        'query'=>$model->getJugadoresreales(),
                        'pagination'=>['pageSize'=>6,]
                    ]),
        'columns' => [
            'alias',
            'puntos',
            'posicion',
            'estado',
            'valorMercado',

            ['class' => 'yii\grid\ActionColumn',
                'urlCreator'=>function ($action,$model, $key,  $index) {
                    return Url::toRoute(['jugadores-reales/'.$action,'id'=>$model->id]);
                } 
            ],

        ],
    ]); ?>


</div>
