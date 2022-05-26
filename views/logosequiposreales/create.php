<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Logosequiposreales */

$this->title = 'Create Logosequiposreales';
$this->params['breadcrumbs'][] = ['label' => 'Logosequiposreales', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="logosequiposreales-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
