<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Calendario */

$this->title = 'Crear Partido';
$this->params['breadcrumbs'][] = ['label' => 'Calendario', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="calendario-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
