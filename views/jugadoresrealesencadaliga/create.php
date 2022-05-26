<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Jugadoresrealesencadaliga */

$this->title = 'Create Jugadoresrealesencadaliga';
$this->params['breadcrumbs'][] = ['label' => 'Jugadoresrealesencadaligas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="jugadoresrealesencadaliga-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
