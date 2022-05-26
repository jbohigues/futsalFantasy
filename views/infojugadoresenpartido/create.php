<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Infojugadoresenpartido */

$this->title = 'Create Infojugadoresenpartido';
$this->params['breadcrumbs'][] = ['label' => 'Infojugadoresenpartidos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="infojugadoresenpartido-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
