<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Usuarios;
use yii\widgets\DetailView;
use yii\data\ActiveDataProvider;

/* @var $this yii\web\View */
/* @var $model app\models\Usuarios */

$this->title = $model->usuario;
$this->params['breadcrumbs'][] = ['label' => 'Usuarios', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="usuarios-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Actualizar', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Eliminar', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => '¿Seguro que quieres eliminar este usuario ?',
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
            'usuario',
            'email:email',
            'password',
            'token',
            ['attribute'=>'estado',
                'label' => 'Estado',   //Si queremos cambiar el nombre de la etiqueta, pero mejor dejar la del modelo
                'filter' => Usuarios::$estadoOptions,
                'value'=>function($data){
                    return $data->estadoText;
                }
		    ],

            ['attribute'=>'rol',
                'label' => 'Rol',   //Si queremos cambiar el nombre de la etiqueta, pero mejor dejar la del modelo
                'filter' => Usuarios::$rolOptions,
                'value'=>function($data){
                    return $data->rolText;
                }
		    ],
        ],
        
    ]) ?>

    <h3>Equipos</h3>
    <?= GridView::widget([
        'dataProvider' => new ActiveDataProvider([
                        'query'=>$model->getEquiposusuarios(),
                        'pagination'=>['pageSize'=>6,]
                    ]),
        'columns' => [
            'nombre',
            'foto',
            'puntos',
            'dinero',
            'numJugadores',

            ['class' => 'yii\grid\ActionColumn',
                'urlCreator'=>function ($action,$model, $key,  $index) {
                    return Url::toRoute(['equiposusuarios/'.$action,'id'=>$model->id]);
                } 
            ],

        ],
    ]); ?>

</div>
