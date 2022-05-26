<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Cardshome */

$this->title = 'Create Cardshome';
$this->params['breadcrumbs'][] = ['label' => 'Cardshomes', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="cardshome-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
