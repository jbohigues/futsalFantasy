<?php

use yii\helpers\Url;
use yii\helpers\Html;
use yii\grid\GridView;
use app\models\Usuarios;
use yii\grid\ActionColumn;

/* @var $this yii\web\View */
/* @var $searchModel app\models\UsuariosSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Usuarios';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="usuarios-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Crear nuevo Usuario', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            // 'id',
            'nombre',
            // 'apellidos',
            'usuario',
            'email:email',
            //'password',
            //'token',
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
            [
                'class' => ActionColumn::className(),
                'urlCreator' => function ($action, Usuarios $model, $key, $index, $column) {
                    return Url::toRoute([$action, 'id' => $model->id]);
                 }
            ],
        ],
    ]); ?>


</div>
