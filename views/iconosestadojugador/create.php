<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Iconosestadojugador */

$this->title = 'Create Iconosestadojugador';
$this->params['breadcrumbs'][] = ['label' => 'Iconosestadojugadors', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="iconosestadojugador-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
