<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposusuarios */

$this->title = 'Actualizar EquipoUsuario: ' . $model->nombre;
$this->params['breadcrumbs'][] = ['label' => 'Equiposusuarios', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->nombre, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Actualizar';
?>
<div class="equiposusuarios-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
