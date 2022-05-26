<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Logosequipousers */

$this->title = 'Create Logosequipousers';
$this->params['breadcrumbs'][] = ['label' => 'Logosequipousers', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="logosequipousers-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
