<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposusuarios */

$this->title = 'Crear nuevo EquipoUsuario';
$this->params['breadcrumbs'][] = ['label' => 'Equiposusuarios', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="equiposusuarios-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
