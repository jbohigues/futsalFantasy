<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Equiposreales */

$this->title = 'Crear Equipo real';
$this->params['breadcrumbs'][] = ['label' => 'Equipos reales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="equiposreales-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
