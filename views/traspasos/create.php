<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Traspasos */

$this->title = 'Create Traspasos';
$this->params['breadcrumbs'][] = ['label' => 'Traspasos', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="traspasos-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
