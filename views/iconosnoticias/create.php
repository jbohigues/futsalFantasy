<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Iconosnoticias */

$this->title = 'Create Iconosnoticias';
$this->params['breadcrumbs'][] = ['label' => 'Iconosnoticias', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="iconosnoticias-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
