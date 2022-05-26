<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Fotosjugadoresreales */

$this->title = 'Create Fotosjugadoresreales';
$this->params['breadcrumbs'][] = ['label' => 'Fotosjugadoresreales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="fotosjugadoresreales-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
